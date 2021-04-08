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
        <a class="portfolio-link" data-toggle="modal" id="${proj.id}" href="#portfolioModal1">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="img/portfolio/${proj.img}" alt="">
        </a>
        <div class="portfolio-caption">
        <h4>${proj.title}</h4>
        <p class="text-muted">${proj.labels}</p>
        </div>
        </div>
        `
    });
    $elProjsDiv.html(strHtmls.join(''));
}



function renderModal(projId) {
    var proj = getProjById(projId);
    var $elH2 = $('.modal-body h2');
    var $elIntro = $('.item-intro');
    var $elImg = $('.modal-body img');
    var $elDate = $('.modal-body li .date')
    var $elCategory = $('.modal-body li .category')
    var $elLink = $('.modal-body li .link')

    $elH2.text(proj.name);
    $elIntro.text(proj.desc);
    $elImg.attr('src', `img/portfolio/${proj.img}`);
    $elDate.text(proj.publishedAt);
    $elCategory.text(proj.labels);
    $elLink.html(`<a href="${proj.url}" target="_blank"<span>Click to check it out!</span></a>`);
}

function onContact() {
    var email = $('.email').val();
    var subj = $('.subject').val();
    var msg = $('.message').val();
    var href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + email + '&su=' + subj + '&body=' + msg;
    window.open(href)
}