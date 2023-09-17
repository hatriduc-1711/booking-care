import express from 'express';

import rankControllers from '~/controllers/rank.controllers';
import validate from '~/middleware/validate.middleware';
import authorization from '~/middleware/authorization.middleware';
import { getRankSchema } from '~/schema/rank.schema';

const rankRouter = express.Router();

rankRouter.get('/', authorization.authenticated, rankControllers.getAllRank);
rankRouter.get('/:id', validate(getRankSchema), authorization.authenticated, rankControllers.getRank);

export default rankRouter;
