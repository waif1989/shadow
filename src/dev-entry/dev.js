import '../assets/css/reset.css';
import '../assets/less/index.less';
import enableInlineVideo from 'iphone-inline-video';
// import videojs from 'video.js';

let playing = false;

function addSourceToVideo(element, src, type) {
    const source = document.createElement('source');
    source.src = src;
    source.type = type;
    element.appendChild(source);
}

function activatePlayinline (domId) {
	const adiv = document.getElementById(domId);
	const shadowVideo = adiv.shadowRoot.querySelector('#shadow-video');
	enableInlineVideo(shadowVideo);
}

function playVideo (outSideElm) {
	outSideElm.shadowRoot.querySelector('#shadow-video').play();
}

function addPlayBtn (root) {
	const button = document.createElement('button');
	button.setAttribute('class', 'video-btn');
	button.setAttribute('onclick', 'videoPlay()');
	root.appendChild(button);
}

function addStyleToShadow (root) {
	const template = document.querySelector('.play-inline');
	root.appendChild(document.importNode(template.content, true));
}

function createShadowRoot (domId) {
	const adiv = document.getElementById(domId);
	let root = null;
	if (document.head.createShadowRoot || document.head.attachShadow) {
		try {
			root = adiv.attachShadow({mode: 'open'});
		} catch (e) {
			root = adiv.createShadowRoot();
		}
	} else {
		root = adiv;
	}
	return root;
}

function createShadowDom () {
    const root = createShadowRoot('video-content');
    // const root = adiv.attachShadow({mode: 'closed'});
    const video = document.createElement('video');
	video.setAttribute('id', 'shadow-video');
    video.setAttribute('class', 'shadow-video video-js');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x-webkit-airplay', 'true');
	video.setAttribute('data-setup', '{}');
	video.setAttribute('preload', 'true');
	video.setAttribute('data-role', 'txp_video_tag');
	video.setAttribute('poster', 'https://onegoods.nosdn.127.net/resupload/2018/5/28/64f7214860701e146fc9ffaa0f58662f.jpg');
    video.setAttribute('controls', '');
	addStyleToShadow(root);
	root.appendChild(video);
	// addPlayBtn(root);
    addSourceToVideo(video, 'https://onegoods.nosdn.127.net/resupload/2018/04/09/e17e7a65f00d7e8173c0c3f88f2c9713.mp4', 'video/mp4');
    return root;
	// activatePlayinline('video-content');
	/*videojs(adiv.shadowRoot.querySelector('#shadow-video'), {}, function onPlayerReady() {
		videojs.log('Your player is ready!');
	});*/
}

function addVideoPlayListr (root) {
	root.getElementById('shadow-video').addEventListener('play', function () {
		playing = true;
		root.getElementById('shadow-video').removeAttribute('controls');
	});
}

function addVideoCloseListr(root) {
	document.getElementById('video-content').addEventListener('touchstart', () => {
		// const adiv = document.getElementById('video-content');
		// playVideo(adiv);
		if (playing) {
			playing = false;
			root.getElementById('shadow-video').setAttribute('controls', '');
			root.getElementById('shadow-video').pause();
		}
	});
}

function init () {
	const root = createShadowDom();
	addVideoPlayListr(root);
	addVideoCloseListr(root);
}



document.body.onload = function () {
	init();
};
