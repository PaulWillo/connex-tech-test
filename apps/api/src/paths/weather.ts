import { Request, Response } from 'express';
import { Operation } from 'express-openapi';
import { locationCoords } from '../util/locationCoords';
import { coordsToTemp } from '../util/coordsToTemp';

// export const GET: Operation = async (req: Request, res: Response) => {
//   const result = Object.keys(locationCoords).map(async (key) => {
//     const coords = locationCoords[key];
//     const temp = await coordsToTemp(coords.lat, coords.long);
//     return { location: key, temp };
//   });

//   return res.send({ data: result });
// };


export const GET: Operation = async (req: Request, res: Response) => {
  try {
    const result = await Promise.all(
      Object.keys(locationCoords).map(async (key) => {
        const coords = locationCoords[key];
        const temp = await coordsToTemp(coords.lat, coords.long);
        return { location: key, temp };
      })
    );

    return res.send({ data: result });
  } catch (error) {
    console.error('Error fetching weather:', error);
    return res.status(500).send({ error: 'Failed to fetch weather data' });
  }
};

GET.apiDoc = {
  description: 'Get weather for locations.',
  operationId: 'getWeather',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: {
            properties: {
              data: {
                type: 'array',
                items: {
                  properties: {
                    location: {
                      type: 'string',
                    },
                    temp: {
                      type: 'number',
                    },
                  },
                  type: 'object',
                },
              },
            },
            required: ['data'],
            type: 'object',
          },
        },
      },
      description: 'Weather',
    },
  },
};
