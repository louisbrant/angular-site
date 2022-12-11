## Start local
### Run  local
```
ng s -o
``` 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
### For custom api url
```
ng s -o --proxy-config ./src/proxy.conf.json
```
## Code generation

Run `ng g module /path/to/module/module-name` to generate a new component. You can also use `ng g directive|pipe|service|class|guard|interface|enum|module|component`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
