/* =========================================================
   ENZONE GLOBAL
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const productsGrid =
    document.getElementById("productsGrid");

const productSearch =
    document.getElementById("productSearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const noProducts =
    document.getElementById("noProducts");


/* MODAL */

const productModal =
    document.getElementById("productModal");

const modalClose =
    document.getElementById("modalClose");

const modalProductImage =
    document.getElementById("modalProductImage");

const modalProductCategory =
    document.getElementById("modalProductCategory");

const modalProductTitle =
    document.getElementById("modalProductTitle");

const modalProductPrice =
    document.getElementById("modalProductPrice");

const modalProductDescription =
    document.getElementById("modalProductDescription");

const modalProductDetails =
    document.getElementById("modalProductDetails");

const modalProductDelivery =
    document.getElementById("modalProductDelivery");

const modalEnquiryButton =
    document.getElementById("modalEnquiryButton");


/* MOBILE NAV */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileNav =
    document.getElementById("mobileNav");


/* =========================================================
   FALLBACK PRODUCT IMAGE
========================================================= */

const fallbackImage =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg"
             width="900"
             height="675"
             viewBox="0 0 900 675">

            <rect
                width="900"
                height="675"
                fill="#f1f4f6"
            />

            <g
                fill="none"
                stroke="#b9c2ca"
                stroke-width="4"
            >

                <rect
                    x="285"
                    y="185"
                    width="330"
                    height="250"
                    rx="15"
                />

                <circle
                    cx="450"
                    cy="305"
                    r="65"
                />

                <path
                    d="M350 185V145H550V185"
                />

            </g>

            <text
                x="450"
                y="510"
                text-anchor="middle"
                fill="#687583"
                font-family="Arial, sans-serif"
                font-size="25"
                font-weight="600"
            >
                Enzone Global
            </text>

        </svg>
    `);


/* =========================================================
   PRODUCT IMAGE HTML
========================================================= */

function getProductImage(product) {

    return `
        <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.onerror=null;this.src='${fallbackImage}'"
        >
    `;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(list) {

    productsGrid.innerHTML = "";

    if (!list.length) {

        noProducts.hidden = false;

        return;

    }

    noProducts.hidden = true;


    list.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                ${getProductImage(product)}

                <span class="product-category">
                    ${product.category}
                </span>

            </div>


            <div class="product-card-body">

                <h3>
                    ${product.name}
                </h3>

                <div class="product-price">
                    ${product.price}
                </div>

                <p class="product-short-description">
                    ${product.short}
                </p>

                <button
                    class="more-info-button"
                    type="button"
                    data-product-id="${product.id}"
                >

                    More info

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            </div>

        `;


        productsGrid.appendChild(card);

    });

}


/* =========================================================
   POPULATE CATEGORIES
========================================================= */

function populateCategories() {

    const categories =
        [...new Set(
            products.map(product => product.category)
        )]
        .sort();


    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);

    });

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function filterProducts() {

    const searchTerm =
        productSearch.value
            .trim()
            .toLowerCase();


    const selectedCategory =
        categoryFilter.value;


    const filtered =
        products.filter(product => {

            const matchesSearch =
                !searchTerm ||

                product.name
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                product.short
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesCategory =
                selectedCategory === "all" ||

                product.category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    renderProducts(filtered);

}


/* =========================================================
   OPEN PRODUCT MODAL
========================================================= */

function openProductModal(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    modalProductImage.src =
        product.image;

    modalProductImage.alt =
        product.name;


    modalProductImage.onerror =
        function () {

            this.onerror = null;

            this.src = fallbackImage;

        };


    modalProductCategory.textContent =
        product.category;


    modalProductTitle.textContent =
        product.name;


    modalProductPrice.textContent =
        product.price;


    modalProductDescription.textContent =
        product.description;


    modalProductDelivery.textContent =
        product.delivery;


    modalProductDetails.innerHTML = "";


    product.details.forEach(detail => {

        const li =
            document.createElement("li");

        li.textContent = detail;

        modalProductDetails.appendChild(li);

    });


    const subject =
        encodeURIComponent(
            `Product enquiry - ${product.name}`
        );


    const body =
        encodeURIComponent(
            `Hello Enzone Global,

I would like more information about:

${product.name}

Please provide the current availability, specification, price and delivery information.

Thank you.`
        );


    modalEnquiryButton.href =
        `mailto:info@enzoneglobal.co.uk?subject=${subject}&body=${body}`;


    productModal.classList.add("active");

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-open");


    /*
       Move keyboard focus to close button
       for accessibility.
    */

    setTimeout(() => {

        modalClose.focus();

    }, 100);

}


/* =========================================================
   CLOSE PRODUCT MODAL
========================================================= */

function closeProductModal() {

    productModal.classList.remove("active");

    productModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");

}


/* =========================================================
   PRODUCT BUTTON EVENT
========================================================= */

productsGrid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".more-info-button"
            );


        if (!button) {
            return;
        }


        const productId =
            button.dataset.productId;


        openProductModal(productId);

    }
);


/* =========================================================
   MODAL CLOSE
========================================================= */

modalClose.addEventListener(
    "click",
    closeProductModal
);


productModal
    .querySelector(".product-modal-backdrop")
    .addEventListener(
        "click",
        closeProductModal
    );


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            productModal.classList.contains("active")
        ) {

            closeProductModal();

        }

    }
);


/* =========================================================
   SEARCH / FILTER
========================================================= */

productSearch.addEventListener(
    "input",
    filterProducts
);


categoryFilter.addEventListener(
    "change",
    filterProducts
);


/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(question => {

    question.addEventListener(
        "click",
        () => {

            const item =
                question.closest(".faq-item");


            const isOpen =
                item.classList.contains("open");


            /*
               Close all other FAQ items
            */

            document
                .querySelectorAll(".faq-item.open")
                .forEach(openItem => {

                    if (openItem !== item) {

                        openItem.classList.remove(
                            "open"
                        );

                    }

                });


            if (isOpen) {

                item.classList.remove("open");

            } else {

                item.classList.add("open");

            }

        }
    );

});


/* =========================================================
   MOBILE NAV
========================================================= */

mobileMenuButton.addEventListener(
    "click",
    () => {

        const isOpen =
            mobileNav.classList.contains("open");


        mobileNav.classList.toggle(
            "open"
        );


        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

    }
);


/* CLOSE MOBILE NAV WHEN LINK IS CLICKED */

mobileNav
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "open"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


/* =========================================================
   NAV ACTIVE STATE
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".desktop-nav .nav-link"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(section => {

    observer.observe(section);

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById(
        "currentYear"
    );


currentYear.textContent =
    new Date().getFullYear();


/* =========================================================
   INITIALISE
========================================================= */

populateCategories();

renderProducts(products);