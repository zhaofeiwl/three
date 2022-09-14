import * as THREE from 'three'
// 轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
import * as dat from "dat.gui";
import { WireframeGeometry } from 'three';
// console.log(THREE)
// 了解gsapWithCSS 最基本的用法

// 1、创建场景 scene
const scene = new THREE.Scene();

// 2、创建相机 
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机的位置
camera.position.set(0,0,10);
scene.add(camera);

// 添加物体
// 添加几何物体
const cube  = new THREE.BoxGeometry(1,1,1);
const caizhi= new THREE.MeshBasicMaterial({color: "#ffff00"});
// 根据几何体和材质创建物体
const cubes = new THREE.Mesh(cube,caizhi)
//放大效果
// cubes.scale.set(2,1,1);
// // 旋转
// cubes.rotation.set(Math.PI/4,0,0,'XYZ')
// 将几何体添加到场景中
scene.add(cubes)

const gui = new dat.GUI();
gui.add(cubes.position,'x').min(1).max(9).step(0.01).name('x轴');
const params = {
    color: '#ffff00',
}
gui.addColor(params,"color").onChange(value=>{
    cubes.material.color.set(value);
});

gui.add(cubes,"visible").name("是否显示");

var folder =gui.addFolder("设置立方体")
folder.add(cubes.material,"wireframe")
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene,camera);


//创建轨道控制器
const controls = new OrbitControls(camera,renderer.domElement);
// 设置轨道控制器阻尼（惯性） 必须调用update
controls.enableDamping = true;

// 添加坐标轴辅助器P7
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


gsap.to(cubes.position,{x:  5,duration: 5})
// 设置时钟
const clock = new THREE.Clock();
function render() {
    controls.update()
    // 获取总时长
    // let time = clock.getElapsedTime();
    // 获取间隔时长
    // let datetime = clock.getDelta()
    // console.log('datetime',datetime)
    // 
    // let t = (time / 1000)%5 ;
    // cubes.position.x = t * 1

    // cubes.position.x +=0.01;
    // if(cubes.position.x >=5){
    //     cubes.position.x = 0;
    // }
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}
render()

// 监听画面变化 
window.addEventListener("resize",() => {
    //更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像头投影矩阵
    camera.updateWorldMatrix();
    // 更新渲染器 
    renderer.setSize(window.innerWidth,window.innerHeight);
    // 设置渲染器像素比
    renderer.setPixelRatio(window.devicePixelRatio);
})