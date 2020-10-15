class App{
    constructor(){
        this.tbody = document.querySelector('#student-timetable > tbody');
        this.rows = [...this.tbody.querySelectorAll('tr')];
        this.select = document.getElementById('select');
        this.paginationList = document.getElementById('pagination');
        this.search = document.getElementById('search');
        this.copyRows = [...this.rows];
        this.select.value = ""
        this.paginatedBy = 10;
        this.page = 1;
        this.reset();
        this.search.addEventListener('keyup',this.getFilteredList)
        this.select.addEventListener('change',this.setPaginatedBy)
    }

    setPaginatedBy = (e) => {
        const value = parseInt(e.target.value);
        this.paginatedBy = this.checkDigit(value,10);
        this.page = 1;
        this.reset()
    }

   

    getPageCount = () => {
        this.pageCount = Math.ceil(this.copyRows.length / this.paginatedBy);
    }

    getStartIndex = ()  => (this.page - 1) * this.paginatedBy;
    getEndIndex = () =>  this.page * this.paginatedBy


    
    createBtn = (text,page,isArrow = false) => {
        const button = document.createElement('button')
        button.innerHTML = text;
        if (isArrow){
            button.setAttribute('role','arrow');
            button.classList.add('large');
        }
        if (page === this.page && !isArrow){
            button.classList.add('active');
        }
        button.setAttribute('page',page);
        button.addEventListener('click',this.setPage);
        return button;
    }

    setPage = (e) => {
        const eventValue = e.target.getAttribute('page');
        const value = parseInt(eventValue);
        this.page = this.checkDigit(value);
        this.reset()
    }

    checkDigit = (value,defaultValue = 1) => isNaN(value) ? defaultValue : value;
    

    getFilteredList = (e) => {
        const value = e.target.value.trim().toLowerCase();
        this.copyRows = this.filterList(value);
        this.reset()
    }

    filterList = (value) => {
        if(!value){
            return [...this.rows]
        }
        const filteredRows = [];
        for (const row of this.rows){
            const columns = row.querySelectorAll('td');
            for (const column of columns){
                const htmlText = column.innerHTML.toLowerCase().trim();
                if(htmlText.includes(value)){
                    filteredRows.push(row);
                    continue;
                }
            }
        }
        this.page = 1;
        return [...filteredRows]
    }

    
    renderTableList = () => {
        const startIndex = this.getStartIndex();
        const endIndex = this.getEndIndex();
        const currentRows = this.copyRows.slice(startIndex,endIndex);
        this.renderList(this.tbody,currentRows);
    }

    renderPaginationList = () => {
        const buttonContainer = [];
        
        if(this.page > 1){
            const prevPage = this.page - 1;
            const firstBtn = this.createBtn('First',1,true);
            const prevBtn = this.createBtn('Previous',prevPage,true);
            const prevBtn2 = this.createBtn(prevPage,prevPage,false); 
            buttonContainer.push(firstBtn,prevBtn,prevBtn2); 
        }

        const currentBtn = this.createBtn(this.page,this.page,false); 
        buttonContainer.push(currentBtn);

        if(this.page < this.pageCount){
            const nextPage = this.page + 1
            const lastBtn = this.createBtn('Last',this.pageCount,true);
            const nextBtn = this.createBtn('Next',nextPage,true);
            const nextBtn2 = this.createBtn(nextPage,nextPage,false);
            buttonContainer.push(nextBtn2,nextBtn,lastBtn); 
        }

        this.renderList(this.paginationList,buttonContainer);

    }

    renderList = (domObject,list) => {
        domObject.innerHTML = "";
        for (const item of list){
            domObject.insertAdjacentElement("beforeend",item);
        }
    }




    reset = () => {
        this.getPageCount();
        this.renderTableList();
        this.renderPaginationList();
    }
}

new App();