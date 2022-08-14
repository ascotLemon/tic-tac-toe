const DOMstuff = (() => {
    const createGameScreen = () => {
        
        const gameHeading = appendElementToBodyWithClasses('h1', ['heading']);
        const gameDetail = appendElementToBodyWithClasses('h2', ['now-playing']);
        const gridWrap = appendElementToBodyWithClasses('div', ['grid-wrap']);

        createSqureGridDiv(9, '.grid-wrap');

        const resetButton = appendElementToBodyWithClasses('button', ['reset-button']);
        resetButton.innerHTML = 'RESET'
    }

    const appendElementToBodyWithClasses = (elementType, classList) => {
        const element = createAndAppendElementToBody(elementType);
        addClassesToElement(element, classList);
        return element;
    }
    
    const createAndAppendElementToBody = (elementType) => {
        const element = document.createElement(elementType);        
        document.body.appendChild(element);
        return element;
    }

    const createSqureGridDiv = (gridWidth, divClassName) => {
        for (let i = 0; i < gridWidth; i++) {
            const gridBox = document.createElement('div');
            addClassesToElement(gridBox, ['grid-item', i, 'box-shadow']);
            appendElementToQuery(divClassName, gridBox);
        }
    }
    
    const appendElementToQuery = (query, element) => {
        const qury =  document.querySelector(query);
        qury.appendChild(element);
    }
    
    const addClassesToElement = (element, classes) => {
        for (let i = 0; i < classes.length; i++) {
            element.classList.add(classes[i]);
        }
    }

    const addContentToQuery = (content, query) => {
        const element = document.querySelector(query);
        element.innerHTML = content;
    }

    const changeWhoIsPlaying = (text) => {
        document.querySelector('.now-playing').innerHTML = text;
    }

    return {
        createGameScreen,
        changeWhoIsPlaying,
        addClassesToElement,
        appendElementToQuery,
        appendElementToBodyWithClasses,
        createSqureGridDiv,
        createAndAppendElementToBody,
        addContentToQuery,
    };
  })();

  export default DOMstuff;