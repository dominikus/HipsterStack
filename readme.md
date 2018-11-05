
## Usage
Run
```
npm install
```
to install all required node.js packages

Run
```
npm run dev
```
to build a development version and serve it from [http://localhost:8080/](http://localhost:8080/)

Run
```
npm run build
```
to build a deployment version (into the build directory)


## Application structure

The application is built on react as main app framework with mobx for state management. 

```
                                                                                           
┌ ─ ─ ─ ─ ─     ┌───────────┐                                                   UI         
           │    │           │                   ┌──────────────┐                           
│  Server   ◀──▶│ dataStore │                   │              │        ┌────────────────┐ 
           │    │           │               ┌──▶│<ReactComp /> ├───┐    │┌───────┐┌─────┐│ 
└ ─ ─ ─ ─ ─     └───────────┘               │   │              │   │    ││       │└─────┘│ 
                      │                     │   └──────────────┘   │    ││       │┌─────┐│ 
                      │     ┌───────────┐   │   ┌──────────────┐   │    │└───────┘└─────┘│ 
                      │     │           │───┘   │              │   └───▶│┌──────────────┐│ 
                      ├────▶│  dataAPI  │──────▶│<ReactComp /> │───────▶││              ││ 
                      │     │           │───┐   │              │   ┌───▶││              ││ 
                      │     └───────────┘   │   └──────────────┘   │    │└──────────────┘│ 
                      │                     │   ┌──────────────┐   │    └────────┬───────┘ 
                ┌───────────┐               │   │              │   │             │         
                │           │               └──▶│<ReactComp /> │───┘        Interaction    
       ┌───────▶│  uiState  │                   │              │                 │         
       │        │           │                   └──────────────┘                 │         
       ▼        └───────────┘                                                    │         
 ┌──────────┐         ▲                                                          │         
 │ URL#hash │         │                                                          │         
 └──────────┘         └──────────────────────────────────────────────────────────┘         

```



The main building blocks are 

### data/dataStore
Connects to any external data sources, typically as [lazyObservable](https://github.com/mobxjs/mobx-utils#lazyobservable) which makes updates easy.

### state/uiState
Stores UI state which is relevant to data updates, more than one UI components or whch should be part of browser history navigation / deeplinking.
uiState should only consists of easily serializable and comparatle atomic information. E.g. a "selectedItemId" rather than a selectedItem object.

### data/dataAPI
Brings together information from the dataStore and uiState to provide all data perspectives individual components might need. For instance, the selectedItemId from the uiState can be resolved through the data loaded in dataStore into a selectedItem object provided by the dataAPI. Any data calculation that might be used multiple times can be stored as @computed value on the dataAPI.

### Components
UI components render dataAPI @computed values and change uiState (or local state) via actions — which in turn might cause a re-render due to change @computed values on the dataAPI.

This structure is loosely inspired by ["Best Practices for building large scale maintainable projects"](https://mobx.js.org/best/store.html) and has proven quite efficient so far.

*Note*: Currently, dataAPI and uiState are imported as singletons in all components. In case a decoupling would become necessary, this could easily be done using the [Provider](https://github.com/mobxjs/mobx-react#provider-and-inject) component.




