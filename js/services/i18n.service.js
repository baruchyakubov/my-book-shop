'use strict'

const gTrans = {
    'heading': {
        en: 'my book shop',
        he: 'חנות הספרים שלי'
    },
    'home': {
        en: 'Home',
        he: 'בית'
    },
    'link': {
        en: 'Link',
        he: 'קישור',
    },
    'disabled': {
        en: 'Disabled',
        he: 'לא זמין'
    },
    'search': {
        en: 'search books',
        he: 'חפש ספרים'
    },
    'filter': {
        en: 'filter',
        he: 'סינון'
    },
    'filter-by-price': {
        en: 'Max price',
        he: 'מחיר מקסימלי:'
    },
    'filter-by-rate': {
        en: 'Min rate',
        he: 'דירוג מינימלי:'
    },
    'add-book': {
        en: 'add book',
        he: 'הוסף ספר'
    },
    'table': {
        en: 'table',
        he: 'טבלה'
    },
    'cards': {
        en: 'cards',
        he: 'כרטיסים'
    },
    'id': {
        en: 'id',
        he: 'מספר מזהה'
    },
    'book-name': {
        en: 'name',
        he: 'שם'
    },
    'price': {
        en: 'price',
        he: 'מחיר'
    },
    'actions': {
        en: 'actions',
        he: 'פעולות'
    },
    'read': {
        en: 'read',
        he: 'קרא'
    },
    'update': {
        en: 'update',
        he: 'עדכן'
    },
    'delete': {
        en: 'delete',
        he: 'מחק'
    },
    'book-description': {
        en: 'book description',
        he: 'פרטי הספר'
    }
}

let gCurrLang = 'en'

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'

    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap.en
    return trans
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function getLang(){
    return gCurrLang
}
