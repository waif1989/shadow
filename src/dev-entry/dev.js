import '../assets/css/reset.css';
import '../assets/less/index.less';
import enableInlineVideo from 'iphone-inline-video';

function addSourceToVideo(element, src, type) {
    const source = document.createElement('source');
    source.src = src;
    source.type = type;
    element.appendChild(source);
}

function activatePlayinline (outSideElm) {
	const shadowVideo = outSideElm.shadowRoot.querySelector('#shadow-video');
	enableInlineVideo(shadowVideo);
}

function playVideo (outSideElm) {
	outSideElm.shadowRoot.querySelector('#shadow-video').play();
}

function addStyleToShadow (root) {
	const template = document.querySelector('.play-inline');
	root.appendChild(document.importNode(template.content, true));
}

function createShadowDom () {
    const adiv = document.getElementById('video-content');
    let root = null;
    if(document.head.createShadowRoot || document.head.attachShadow) {
        try {
            root = adiv.attachShadow({mode: 'open'});
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
	video.setAttribute('id', 'shadow-video');
    video.setAttribute('class', 'shadow-video');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x-webkit-airplay', 'true');
	video.setAttribute('preload', 'auto');
	video.setAttribute('poster', 'https://onegoods.nosdn.127.net/resupload/2018/5/28/64f7214860701e146fc9ffaa0f58662f.jpg');
    video.setAttribute('controls', 'true');
    root.appendChild(video);
    addSourceToVideo(video, 'https://onegoods.nosdn.127.net/resupload/2018/04/09/e17e7a65f00d7e8173c0c3f88f2c9713.mp4', 'video/mp4');
	addStyleToShadow(root);
	activatePlayinline(adiv);
	// playVideo(adiv);
}

function templateReplace () {
    const host = document.querySelector('#video-content');
    const root = host.attachShadow({mode:'open'});
    const con = document.getElementById('tp-video').content.cloneNode(true);
    root.appendChild(con);
}

document.getElementById('video-content').addEventListener('touchstart', () => {
	// const adiv = document.getElementById('video-content');
	// playVideo(adiv);
});

document.body.onload = createShadowDom;
