import { Request, Response } from 'express';
import { Operation } from 'express-openapi';
import { sequelize } from '../service/sequelize';
import { QueryTypes } from 'sequelize';

export const GET: Operation = async (req: Request, res: Response) => {
  const reports = await sequelize.query(
    `
    SELECT 
      DATE(i.created_at) as date,
      a.name as agent_name,
      a.id as agent_id,
      COUNT(i.id) as total_interactions,
      AVG(i.length_seconds) as average_interaction_length
    FROM interactions i
    INNER JOIN agents a ON i.agent_id = a.id
    WHERE i.created_at IS NOT NULL
    GROUP BY DATE(i.created_at), a.id, a.name
    ORDER BY date DESC, a.name ASC
    `,
    {
      type: QueryTypes.SELECT,
    }
  );

  interface ReportItem {
    date: string;
    agent_name: string;
    agent_id: number;
    total_interactions: number;
    average_interaction_length: number;
  }

  const data: ReportItem[] = reports.map((r: any) => ({
    date: r.date,
    agent_name: r.agent_name,
    agent_id: r.agent_id,
    total_interactions: parseInt(r.total_interactions),
    //Currently the data comes back as "98654" this I assume is seconds per interaction
    //Its worth the backend converting this into minutes for easier consumption
    average_interaction_length: Math.round(
      parseFloat(r.average_interaction_length) / 60
    ),
  }));

  return res.send({ data });
};

GET.apiDoc = {
  description: 'Get daily agent interaction report.',
  operationId: 'getReports',
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
                    date: {
                      type: 'string',
                      format: 'date',
                    },
                    agent_name: {
                      type: 'string',
                    },
                    agent_id: {
                      type: 'number',
                    },
                    total_interactions: {
                      type: 'number',
                    },
                    average_interaction_length: {
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
      description: 'Daily Agent Report',
    },
  },
};
