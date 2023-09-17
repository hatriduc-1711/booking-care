import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { PORT, API } from '~/constants/variable.constants';
import initAPIRouter from '~/routes/api.routes';
import modelRelationship from '~/configs/association';

const app = express();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'APIs For Booking Care',
      description: 'API for medical appointment booking application !!!',
      version: '1.0.0',
    },
    servers: [
      {
        url: API,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./swagger/*.yaml'],
};
const openapiSpecification = swaggerJsdoc(options);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use('/docs/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

initAPIRouter(app);
modelRelationship();

app.listen(PORT, () => {
  console.log(`🚀 Server is listening to port: ${PORT}`);
});
