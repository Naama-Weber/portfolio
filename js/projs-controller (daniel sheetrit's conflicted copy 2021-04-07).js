'use strict';

$(document).ready(initPage);

function initPage() {
    renderProjs();
}

function renderProjs() {
    var projs = getProjs()
    var $elProjsDiv = $('.projs-container');
    console.log($elProjsDiv)
    var strHtmls = projs.map(function (proj) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item" onclick="renderModal('${proj.id}')">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${proj.id}">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="img/portfolio/${proj.url}" alt="">
        </a>
        <div class="portfolio-caption">
        <h4>${proj.title}</h4>
        <p class="text-muted">${proj.desc}</p>
        </div>
        </div>
        `
    });
    $elProjsDiv.html(strHtmls.join(''));
}



function renderModal(projId) {
    console.log('hi');
    var proj = getProjById(projId);
    var $elModal = $('.modal-body');
    var strHtmls =
        `
        <h2>${proj.name}</h2>
        <p class="item-intro text-muted">${proj.desc}</p>
        <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.url}" alt="">
        <p>${proj.desc}</p>
        <ul class="list-inline">
            <li>Date: ${proj.publishedAt}</li>
            <li>Category: ${proj.lables}</li>
        </ul>
        <button class="btn btn-primary" data-dismiss="modal" type="button">
            <i class="fa fa-times"></i>
                Close Project</button>
           `;

    $elModal.html = strHtmls;
}
