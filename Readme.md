### Cloning the repository
```ssh
git clone https://github.com/eliabefranca/project-management-challenge.git
```
### Running the project
```ssh
cd project-management-challenge
```
```ssh
npm install
```
```ssh
npm run dev
```

### Project details
I didn't use a state management library, because I think it's not necessary for a project this size. I used the Context API to manage the state of the application.
I also used the React Beautiful DnD library to make the drag and drop feature.
```ssh
├───src
│   ├───components
│   │   ├───...
│   ├───hooks
│   │   ├───useProjects.tsx // state management is here
|   ├───helpers
|   │   ├───localStorage.ts // localStorage helper
|   ...
...
```

