import { Request, Response } from 'express';
import { AppDataSource } from '../../common/database/data-source';
import { Artist } from './artist.model';

class ArtistController {
  async handleCreateArtistRequest(req: Request, res: Response) {
    const { name } = req.body;
    const requestingUser = req.user;
    try {
      const artist = await AppDataSource.getRepository(Artist).save({ name });
      console.log(`User ${requestingUser.id} created artist ${artist.id}`);
      return res.json({ ok: true, artist });
    } catch (error) {
      console.log(error, 'error creating artist');
      return res.status(500).json({ ok: false, error });
    }
  }

  async handleListArtistsRequest(_req: Request, res: Response) {
    try {
      const artists = await AppDataSource.getRepository(Artist).find();
      return res.json({ ok: true, artists });
    } catch (error) {
      console.log(error, 'error listing artists');
      return res.status(500).json({ ok: false, error });
    }
  }

  async handleUpdateArtistRequest(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const requestingUser = req.user;
    try {
      const artist = await AppDataSource.getRepository(Artist).findOne({
        where: { id: +id },
      });
      if (name !== undefined) artist.name = name;
      await AppDataSource.getRepository(Artist).save(artist);
      console.log(`User ${requestingUser.id} updated artist ${artist.id}`);
      return res.json({ ok: true, artist });
    } catch (error) {
      console.log(error, 'error updating artist');
      return res.status(500).json({ ok: false, error });
    }
  }

  async handleDeleteArtistRequest(req: Request, res: Response) {
    const { id } = req.params;
    const requestingUser = req.user;
    try {
      const artist = await AppDataSource.getRepository(Artist).findOne({
        where: { id: +id },
      });
      await AppDataSource.getRepository(Artist).delete(artist);
      console.log(`User ${requestingUser.id} deleted artist ${artist.id}`);
      return res.json({ ok: true, artist });
    } catch (error) {
      console.log(error, 'error deleting artist');
      return res.status(500).json({ ok: false, error });
    }
  }
}

export default new ArtistController();
