import '../assets/css/reset.css';
import '../assets/less/index.less';

const classStyle = {
    width: '7.5rem',
    display: 'block',
    margin: 'auto',
    height: '4rem'
};

function addSourceToVideo(element, src, type) {
    var source = document.createElement('source');

    source.src = src;
    source.type = type;

    element.appendChild(source);
};

function createShadowDom () {
    const adiv = document.getElementById('video-content');
    let root = null;
    if(document.head.createShadowRoot || document.head.attachShadow) {
        try {
            root = adiv.attachShadow({mode: 'closed'});
        } catch (e) {
            root = adiv.createShadowRoot();
        }
    } else {
        root = adiv;
    }
    // const root = adiv.attachShadow({mode: 'closed'});
    const video = document.createElement('video');
    video.style.width = '7.5rem';
    video.style.height = '4rem';
    video.setAttribute('class', 'shadow-video');
    video.setAttribute('playsinline', 'isiPhoneShowPlaysinline');
    video.setAttribute('webkit-playsinline', 'isiPhoneShowPlaysinline');
    video.setAttribute('x-webkit-airplay', '');
    video.setAttribute('controls', 'true');
    video.setAttribute('data-role', 'txp_video_tag');
    root.appendChild(video);
    addSourceToVideo(video, 'https://vdse.bdstatic.com//bd2af75963ad5a4dd8151ec3d069f7d1.mp4', 'video/mp4');

};

function templateReplace () {
    const host = document.querySelector('#video-content');
    const root = host.attachShadow({mode:'open'});
    const con = document.getElementById('tp-video').content.cloneNode(true);
    root.appendChild(con);
}

document.body.onload = createShadowDom;
