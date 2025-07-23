document.addEventListener('DOMContentLoaded', () => {

    const searchWrapper = document.getElementById('search-wrapper');
    const iconsWrapper = document.getElementById('icons-wrapper');
    const searchIconButton = document.getElementById('search-icon-button');
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const searchResultsContainer = document.getElementById('search-results');
    
    if (!searchWrapper || !iconsWrapper || !searchIconButton || !searchInput || !searchResultsContainer) {
        console.error("Search component elements not found! Please check your HTML structure.");
        return;
    }

    let isSearchOpen = false;

    const mockData = [
        "Order #299283 - Alex Trie",
        "Room S-01",
        "Order #299265 - Jerome Bell",
        "Menu Item: Beef Steak",
        "Room D-08",
        "Order #299222 - Annette Black",
        "Menu Item: Chicken Curry",
        "Menu Item: Garden Salad",
        "Customer: Kristin Watson",
        "Order #299170 - Floyd Miles",
        "Menu Item: Vegan Burger",
        "Customer: Robert Fox",
        "Room S-22",
        "Menu Item: Pizza Margherita"
    ];

    const openSearch = () => {
        isSearchOpen = true;
        searchInput.classList.remove('hidden');
        iconsWrapper.classList.add('hidden');
        searchInput.focus();
    };

    const closeSearch = () => {
        isSearchOpen = false;
        searchInput.classList.add('hidden');
        iconsWrapper.classList.remove('hidden');
        searchResultsContainer.classList.add('hidden');
        searchInput.value = '';
        searchResultsContainer.innerHTML = '';
    };

    const displayResults = (results: string[]) => {
        searchResultsContainer.innerHTML = '';

        if (results.length === 0) {
            searchResultsContainer.classList.add('hidden');
            return;
        }
        
        const limitedResults = results.slice(0, 6);

        limitedResults.forEach(result => {
            const item = document.createElement('a');
            item.href = '#'; 
            item.className = 'block p-3 text-sm text-text-primary hover:bg-page transition-colors';
            item.textContent = result;
            searchResultsContainer.appendChild(item);
        });
        
        searchResultsContainer.classList.remove('hidden');
    };

    searchIconButton.addEventListener('click', (event) => {
        event.stopPropagation();
        openSearch();
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            searchResultsContainer.classList.add('hidden');
            return;
        }
        
        const filteredResults = mockData.filter(item => 
            item.toLowerCase().includes(searchTerm)
        );
        
        displayResults(filteredResults);
    });

    document.addEventListener('click', (event) => {
        const mainContainer = document.querySelector('.flex.items-center.gap-4');
        
        if (isSearchOpen && mainContainer && !mainContainer.contains(event.target as Node)) {
            closeSearch();
        }
    });
});