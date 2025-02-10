let snake; // 声明蛇对象
let food; // 声明食物对象
let gridSize = 20; // 网格大小

function setup() {
    createCanvas(400, 400); // 创建一个 400x400 像素的画布
    frameRate(4); // 将帧率设置为 5，减慢蛇的移动速度
    snake = new Snake(); // 创建一个新的蛇对象
    foodLocation(); // 生成食物的位置
}

function foodLocation() {
    let cols = floor(width / gridSize); // 计算画布的列数
    let rows = floor(height / gridSize); // 计算画布的行数
    // 随机生成食物的位置，并将其放置在网格上
    food = createVector(floor(random(cols)), floor(random(rows))).mult(gridSize);
}

function draw() {
    background(51); // 设置背景颜色为深灰色
    snake.update(); // 更新蛇的位置
    snake.show(); // 显示蛇

    // 检查蛇是否吃到食物
    if (snake.eat(food)) {
        foodLocation(); // 吃到食物后生成新的食物
    }

    fill(255, 0, 0); // 设置食物的颜色为红色
    rect(food.x, food.y, gridSize, gridSize); // 绘制食物
}

function keyPressed() {
    // 根据按下的方向键设置蛇的移动方向
    if (keyCode === UP_ARROW) {
        snake.setDir(0, -1); // 向上移动
    } else if (keyCode === DOWN_ARROW) {
        snake.setDir(0, 1); // 向下移动
    } else if (keyCode === RIGHT_ARROW) {
        snake.setDir(1, 0); // 向右移动
    } else if (keyCode === LEFT_ARROW) {
        snake.setDir(-1, 0); // 向左移动
    }
}

class Snake {
    constructor() {
        this.body = []; // 蛇的身体数组
        this.body[0] = createVector(floor(width / 2), floor(height / 2)); // 初始化蛇的头部位置
        this.xdir = 0; // 蛇的 x 方向
        this.ydir = 0; // 蛇的 y 方向
        this.len = 0; // 蛇的长度
    }

    setDir(x, y) {
        this.xdir = x; // 设置蛇的 x 方向
        this.ydir = y; // 设置蛇的 y 方向
    }

    update() {
        // 如果没有方向，蛇不移动
        if (this.xdir === 0 && this.ydir === 0) return;

        let head = this.body[this.body.length - 1].copy(); // 获取蛇头的位置
        head.x += this.xdir * gridSize; // 更新蛇头的 x 坐标
        head.y += this.ydir * gridSize; // 更新蛇头的 y 坐标

        // 检查是否撞墙
        if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
            return; // 撞墙不移动
        }

        this.body.shift(); // 移除尾部
        this.body.push(head); // 添加新的头部
    }

    grow() {
        let head = this.body[this.body.length - 1].copy(); // 获取蛇头的位置
        this.len++; // 增加蛇的长度
        this.body.push(head); // 增加蛇的身体
    }

    endGame() {
        let x = this.body[this.body.length - 1].x; // 获取蛇头的 x 坐标
        let y = this.body[this.body.length - 1].y; // 获取蛇头的 y 坐标
        for (let i = 0; i < this.body.length - 1; i++) {
            let part = this.body[i]; // 获取蛇身体的每一部分
            if (part.x === x && part.y === y) {
                return true; // 撞到自己
            }
        }
        return false; // 没有撞到自己
    }

    eat(pos) {
        let x = this.body[this.body.length - 1].x; // 获取蛇头的 x 坐标
        let y = this.body[this.body.length - 1].y; // 获取蛇头的 y 坐标
        if (x === pos.x && y === pos.y) {
            this.grow(); // 吃到食物后增长
            return true; // 返回 true 表示吃到食物
        }
        return false; // 返回 false 表示没有吃到食物
    }

    show() {
        for (let i = 0; i < this.body.length; i++) {
            fill(0, 255, 0); // 设置蛇的颜色为绿色
            noStroke(); // 不绘制边框
            rect(this.body[i].x, this.body[i].y, gridSize, gridSize); // 绘制蛇的每一部分
        }
    }
}
