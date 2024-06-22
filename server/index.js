import express from 'express';
import createApolloGraphqlServer from './graphql';
import { expressMiddleware } from '@apollo/server/express4';


async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());

    const gqlServer = await createApolloGraphqlServer();

    // CREATE GRAPHQL SERVER
    app.use('/graphql', expressMiddleware(gqlServer));
   
    app.get('/', (req, res) => {
        res.json({
            msg: "server is up and running"
        });
    });

   
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

init();
