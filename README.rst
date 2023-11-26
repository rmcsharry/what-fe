=================
React Boilerplate
=================

`Divio Cloud <http://www.divio.com/>`_ based boilerplate to develop with React.

The sample project was created using the
`Create React App <https://facebook.github.io/create-react-app/docs/getting-started>`_.

Up to date with `React <https://reactjs.org//>`_ **18.2.0**.

Local development
=================

After setting up a project you are required to run `docker-compose run --rm web npm install` 
in order for node modules to appear in the mounted volume.

You need to add a local .env file in the root folder with this var:

`REACT_APP_BASE_API_URL=http://127.0.0.1:8000`

You also need the api running locally in order to make requests, which is in this repo: https://github.com/rmcsharry/what-test
