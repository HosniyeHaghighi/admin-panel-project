type UserStatus = 'new' | 'onProgress' | 'readyToServe' | 'cancelled';

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    status: UserStatus;
};

type FiltersState = {
    new: boolean;
    onProgress: boolean;
    readyToServe: boolean;
    cancelled: boolean;
};

document.addEventListener('DOMContentLoaded', () => {
    
    const iconsWrapper = document.getElementById('icons-wrapper');
    const searchIconButton = document.getElementById('search-icon-button');
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const searchResultsContainer = document.getElementById('search-results');
    const filterError = document.getElementById('filter-error-message');
    const checkBoxes = {
        new: document.getElementById('filter-new') as HTMLInputElement,
        onProgress: document.getElementById('filter-on-progress') as HTMLInputElement,
        readyToServe: document.getElementById('filter-ready') as HTMLInputElement,
        cancelled: document.getElementById('filter-cancelled') as HTMLInputElement
    };
    
    if (!iconsWrapper || !searchIconButton || !searchInput || !searchResultsContainer || !filterError) {
        console.error("Core elements not found!");
        return;
    }


    let activeFilters: FiltersState = {
        new: false, onProgress: false, readyToServe: false, cancelled: false
    };
    let userData: User[] = [];
    let isSearchOpen = false;

    fetchSearchData();

    async function fetchSearchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data: Omit<User, 'status'>[] = await response.json();
            const statuses: UserStatus[] = ['new', 'onProgress', 'readyToServe', 'cancelled'];
            userData = data.slice(0, 10).map((user, index) => ({ ...user, status: statuses[index % 4] }));
            console.log("User data loaded.");
        } catch (error: any) {
            console.error("Error fetching data:", error);
        }
    }


    const openSearch = () => {
        const isAnyFilterActive = Object.values(activeFilters).some(v => v);
        if (!isAnyFilterActive) {
            filterError.classList.remove('hidden');
            return;
        }
        filterError.classList.add('hidden');
        isSearchOpen = true;
        searchInput.classList.remove('hidden');
        iconsWrapper.classList.add('hidden');
        searchInput.focus();
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////
    const closeSearch = () => {
        isSearchOpen = false;
        searchInput.classList.add('hidden');
        iconsWrapper.classList.remove('hidden');
        searchResultsContainer.classList.add('hidden');
        searchInput.value = '';
    };
    
    const displaySearchResults = (results: User[]) => {
        searchResultsContainer.innerHTML = '';
        if (results.length === 0) {
            searchResultsContainer.innerHTML = `<p class="text-center py-4 text-gray-500">Result not found</p>`;
        } else {
            const limitedResults = results.slice(0, 6);
            limitedResults.forEach(user => {
                const item = document.createElement('a');
                item.href = '#';
                item.className = 'block p-3 hover:bg-page transition-colors';
                item.innerHTML = `
                    <p class="text-sm font-semibold text-gray-800">${user.name}</p>
                    <p class="text-xs text-gray-600">${user.email}</p>
                `;
                searchResultsContainer.appendChild(item);
            });
        }
        searchResultsContainer.classList.remove('hidden');
    };
    
    const updateSearchResults = () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            searchResultsContainer.classList.add('hidden');
            return;
        }
        let filteredData = userData.filter(user => activeFilters[user.status]);
        filteredData = filteredData.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        displaySearchResults(filteredData);
    };

    searchIconButton.addEventListener('click', e => { e.stopPropagation(); openSearch(); });
    searchInput.addEventListener('input', updateSearchResults);
    
    Object.entries(checkBoxes).forEach(([key, checkbox]) => {
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                activeFilters[key as keyof FiltersState] = checkbox.checked;
                const isAnyFilterActive = Object.values(activeFilters).some(v => v);
                if (isAnyFilterActive) filterError.classList.add('hidden');
                if (isSearchOpen) updateSearchResults();
            });
        }
    });


    document.addEventListener('click', (event) => {
        const headerRightSide = document.querySelector('.flex.items-center.gap-4');
        const filtersSidebar = document.getElementById('filters-sidebar'); 
        if (isSearchOpen && 
            headerRightSide && !headerRightSide.contains(event.target as Node) &&
            filtersSidebar && !filtersSidebar.contains(event.target as Node)) 
        {
            closeSearch();
        }
    });

});    
