const fs = require('fs').promises;
const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');
const cors = require('@koa/cors');
const mm = require('music-metadata');
const _ = require('lodash');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 3000;
const musicPath = path.resolve('./music');

const api = new Router();

const allTrackMeta = async () => {
  const filenames = await fs.readdir(musicPath);

  const result = filenames.map(async (file) => {
    const meta = await mm.parseFile(path.join(musicPath, file));

    const contributingArtists = meta.common.artist ?
      meta.common.artist.split(', ') :
      null;

    return {
      albumArtist: meta.common.albumartist,
      contributingArtists,
      album: meta.common.album,
      trackNum: meta.common.track.no,
      title: meta.common.title,
      year: meta.common.year,
      filename: file,
    };
  });

  return Promise.all(result);
};

const ciMatch = (a, b) => a.toLowerCase() === b.toLowerCase();

api
  .get('/tracks', async (ctx) => {
    const tracks = await allTrackMeta();
    ctx.body = _.sortBy(tracks, ['albumArist', 'year', 'album', 'trackNum']);
  })
  .get('/artists', async (ctx) => {
    const tracks = await allTrackMeta();

    const artists = tracks.reduce((acc, cur) => {
      if (
        cur.albumArtist &&
        !acc.find(existing => ciMatch(existing, cur.albumArtist))
      ) {
        acc.push(cur.albumArtist);
      }

      if (cur.contributingArtists && cur.contributingArtists.length > 0) {
        cur.contributingArtists.forEach((artist) => {
          if (!acc.find(existing => ciMatch(existing, artist))) acc.push(artist);
        });
      }

      return acc;
    }, []);

    ctx.body = artists.sort();
  })
  .get('/artist/:artist', async (ctx) => {
    const tracks = await allTrackMeta();

    const tracksByArtist = tracks.filter((song) => {
      return (
        (ciMatch(song.albumArtist, ctx.params.artist)) ||
        (
          song.contributingArtists &&
          song.contributingArtists.find(artist => ciMatch(artist, ctx.params.artist))
        )
      );
    });

    ctx.body = _.groupBy(tracksByArtist, 'album');
  })
  .get('/artist/:artist/:album', async (ctx) => {
    const tracks = await allTrackMeta();

    const tracksOnAlbum = tracks.filter((song) => {
      return (
        ciMatch(song.albumArtist, ctx.params.artist) &&
        ciMatch(song.album, ctx.params.album)
      );
    });

    ctx.body = _.sortBy(tracksOnAlbum, ['trackNum']);
  })
  .get('/albums', async (ctx) => {
    const tracks = await allTrackMeta();

    const albums = _.uniqWith(tracks, (a, b) => {
      return (ciMatch(a.albumArtist, b.albumArtist) && ciMatch(a.album, b.album));
    }).map(song => ({
      album: song.album,
      artist: song.albumArtist,
      year: song.year,
    }));

    ctx.body = _.sortBy(albums, ['album', 'artist', 'year']);
  });

router.use('/api', json(), api.routes());

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);
console.log(`Musicapp server listening on port ${port}.`);
