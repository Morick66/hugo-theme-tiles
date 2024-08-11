document.addEventListener("DOMContentLoaded", function() {
    const piecesContainer = document.getElementById('pieces-container');
    const loading = document.getElementById('pieces-loading');
    const loaderror = document.getElementById('load-error');
    const loadMoreButton = document.getElementById('load-more');
    const loadMoreContainer = document.getElementById('load-more-container');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('close-popup');
    const popupText = document.getElementById('popup-text');
    const twikooDiv = document.getElementById('tcomment');
    const popupOverlay = document.getElementById('popup-overlay');
    let allItems = []; // 保存所有数据
    let itemsLoaded = 0;
    let itemsPerPage = 8;
    let hasMoreItems = true;
    let resizeTimeout;
    var element = document.getElementById('piecesBaseurl');
    var baseURL = element.getAttribute('data-baseurl');
    function getColumnCount() {
        const width = window.innerWidth;
        if (width < 600) {
            return 1;
        } else if (width < 900) {
            return 2;
        } else if (width < 1200) {
            return 3;
        } else {
            return 4;
        }
    }
    let columns = [];
    function createColumns() {
        const columnCount = getColumnCount();
        columns = new Array(columnCount).fill(null).map(() => ({
            element: document.createElement('div'),
            height: 0
        }));

        piecesContainer.innerHTML = ''; // 清空之前的列
        columns.forEach((column, index) => {
            column.element.className = 'pieces-column';
            column.element.id = `column-${index}`;
            piecesContainer.appendChild(column.element);
        });
    }

    createColumns();

    function findShortestColumn() {
        return columns.reduce((shortest, column) => column.height < shortest.height ? column : shortest);
    }

    function addPiece(item) {
        const piecesItem = document.createElement('div');
        piecesItem.className = 'pieces-item';
        piecesItem.style.height = 'auto'; // 确保高度自适应内容

        const content = document.createElement('div');
        content.textContent = item.idea;
        content.className = 'pieces-content';
        piecesItem.appendChild(content);
        
        if (item.link) {
            const link = document.createElement('a');
            link.href = item.link;
            link.target = '_blank';
            link.innerHTML = '🔗来源链接'
            link.className = 'source-link';
            piecesItem.appendChild(link);
        }

        if (item.images && item.images.length > 0) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'pieces-images';
            imgContainer.style.justifyContent = 'center';
            imgContainer.style.marginTop = '10px';
            item.images.forEach(image => {
                const imgBox = document.createElement('div');
                imgBox.className = 'pieces-image-box';
                const img = document.createElement('img');
                img.dataset.src = `${baseURL}/uploads/${image}`;
                img.src = '/images/img-bgc.svg'; // 占位图片的 URL
                img.alt = item.idea;
                img.loading = 'lazy';
                img.onload = function() {
                    // 图片加载完成后，替换 src 属性为实际图片的 URL
                    this.src = this.dataset.src;
                };
                const imgLightbox = document.createElement('a');
                imgLightbox.href = `${baseURL}/uploads/${image}`;
                imgLightbox.dataset.lightbox = `item-${item.id}`
                imgContainer.appendChild(imgBox);
                imgBox.appendChild(imgLightbox);
                imgLightbox.appendChild(img);
            });

            piecesItem.appendChild(imgContainer);
        }

        const timestamp = document.createElement('div');
        timestamp.textContent = item.timestamp;
        timestamp.className = 'pieces-timestamp';
        piecesItem.appendChild(timestamp);

        // 添加弹窗按钮
        const popupButton = document.createElement('div');
        
        popupButton.className = 'popup-button';
        const svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.82388455,18.5880577 L4,21 L4.65322944,16.4273939 C3.00629211,15.0013 2,13.0946628 2,11 C2,6.581722 6.4771525,3 12,3 C17.5228475,3 22,6.581722 22,11 C22,15.418278 17.5228475,19 12,19 C10.8897425,19 9.82174472,18.8552518 8.82388455,18.5880577 Z"/></svg>'
        popupButton.innerHTML = svgIcon;
        popupButton.onclick = function() {
            showPopup(item);
        };
        piecesItem.appendChild(popupButton);

        const shortestColumn = findShortestColumn();
        shortestColumn.element.appendChild(piecesItem);
        shortestColumn.height += piecesItem.offsetHeight; // 更新列的高度
    }

    function fetchData() {
        if (!hasMoreItems) {
            return;
        }

        loading.style.display = 'block';
        loadMoreButton.disabled = true;

        fetch(`${baseURL}/data.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                allItems = data; // 保存所有数据
                displayItems();
                loading.style.display = 'none';
            })
            .catch(error => {
                loadMoreButton.disabled = false;
                loaderror.textContent = '加载失败，刷新重试';
            });
    }

    function displayItems() {
        const itemsToLoad = itemsLoaded === 0 ? 10 : itemsPerPage;
        const items = allItems.slice(itemsLoaded, itemsLoaded + itemsToLoad);
        
        if (items.length === 0) {
            hasMoreItems = false;
            loadMoreContainer.style.display = 'none';
        } else {
            for (let item of items) {
                addPiece(item);
            }
            itemsLoaded += items.length;
            
            if (itemsLoaded >= 10) {
                loadMoreContainer.style.display = 'block';
            }
            
            loadMoreButton.disabled = false;
        }
    }
    
    function showPopup(item) {
        const imagesHTML = item.images && item.images.length > 0 
        ? item.images.map(image => `
            <div class="pieces-image-box">
                <img src="${baseURL}/uploads/${image}" alt="${item.idea}" loading="lazy">
            </div>`).join('')
        : '';
        popupText.innerHTML = `
            <h2>${item.timestamp}</h2>
            <p>${item.idea}</p>
            <div class="pieces-images" style="justify-content: center; margin-top: 10px;">
                ${imagesHTML}
            </div>
        `;
        if (item.link) {
            const linkHTML = `<a href="${item.link}" class="source-link" target="_blank">🔗来源链接</a>`;
            popupText.innerHTML += linkHTML;
        }
        popupOverlay.style.display = 'block';
        popup.style.display = 'block';
        const url = new URL(window.location);
        url.hash = `item-${encodeURIComponent(item.id)}`;
        history.pushState(null, null, url);

        const commentDivId = `tcomment-${item.id}`;
        const commentDiv = document.createElement('div');
        commentDiv.id = commentDivId;
        twikooDiv.appendChild(commentDiv);
        var element = document.getElementById('twikooEnvid');
        var envid = element.getAttribute('data-envid');
        twikoo.init({
            el: `#${commentDivId}`,
            envId: envid,
            path: url.href,
        });
    }

    closePopup.onclick = function() {
        popup.style.display = 'none';
        twikooDiv.innerHTML = '';
        const url = new URL(window.location);
        url.hash = '';
        history.pushState(null, null, url);
        popupOverlay.style.display = 'none';
    };

    popupOverlay.onclick = function() {
        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
        twikooDiv.innerHTML = '';
        const url = new URL(window.location);
        url.hash = '';
        history.pushState(null, null, url);
    };

    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            const url = new URL(window.location);
            url.hash = '';
            history.pushState(null, null, url);
        }
    });

    window.addEventListener('popstate', function(event) {
        if (window.location.hash.startsWith('#item-')) {
            const itemId = window.location.hash.substring(6);
            const item = allItems.find(item => item.id === itemId);
            if (item) {
                showPopup(item);
            }
        } else {
            popup.style.display = 'none';
        }
    });

    fetchData();

    loadMoreButton.addEventListener('click', function() {
        displayItems();
    });

    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            createColumns();
            for (let i = 0; i < itemsLoaded; i++) {
                addPiece(allItems[i]);
            }
        }, 250); // 延迟执行，防止频繁触发
    });
});