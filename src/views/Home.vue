<template>
  <div class="home">
    <Header @set="set" />
    <div class="main-content" @click="getEvent">
      <iframe
        src="/love.html"
        frameborder="0"
        id="iframeLove"
        v-if="showLove"
      ></iframe>
      <div class="screen">
        <div class="left_screen">
          <span style="position: absolute; top: 2px">我</span>
          <img
            :key="history.length"
            :src="require(`@/assets/svg/${history[history.length - 1].myImg}`)"
            class="left_Img"
            v-if="history.length > 0"
          />
        </div>
        <div class="center_screen">vs</div>
        <div class="right_screen">
          <span style="position: absolute; top: 2px; cursor: pointer">
            <span @click.stop="selcetName">{{ dsName }}</span>
            <ul class="nameList" v-if="showName" @click.stop>
              <li
                class="nameitem"
                :class="dsName == item ? 'active' : ''"
                v-for="item in nameList"
                :key="item"
                @click="
                  dsName = item;
                  closeName();
                "
              >
                {{ item }}
              </li>
              <li class="nameitem">
                <input type="text" style="width: 90px" v-model="newName" />
              </li>
              <li style="text-align: center; color: #1492ff" @click="addName">
                添加
              </li>
            </ul>
          </span>
          <img
            :key="history.length"
            :src="
              require(`@/assets/svg/${history[history.length - 1].computerImg}`)
            "
            class="right_Img"
            v-if="history.length > 0"
          />
        </div>
      </div>
      <div class="clear">
        <span>战绩：{{ myScore }}：{{ computerScore }}</span>
        <span class="clearBtn" @click="clear">清屏</span>
      </div>
      <div class="content">
        <div v-for="(item, index) in history" :key="index">
          <p>请输入你出的拳，石头、剪刀、布：{{ item.myBox }}</p>
          <p>{{ item.result }}</p>
        </div>
        <div
          style="height: 100px; cursor: text"
          @click="
            () => {
              this.$refs.inputVal.focus();
            }
          "
        >
          <p
            :class="[history.length > 0 ? 'inputbody' : '']"
            style="display: flex"
          >
            请输入你出的拳，石头、剪刀、布：<input
              type="text"
              id="myBox"
              ref="inputVal"
              v-model="value"
              spellcheck="false"
              :placeholder="placeholder"
            />
          </p>
        </div>
      </div>
    </div>
    <Modal v-model="visible" :width="200" :title="'设置'" maskClose>
      <div class="modal-content">
        <p style="display: flex">
          动画持续时间：<input
            style="flex: 1; min-width: 0"
            type="number"
            min="1"
            max="15"
            spellcheck="false"
            :placeholder="placeholder"
            :value="duration / 1000"
            @input="setDuration"
          />&nbsp;s
        </p>
      </div>
    </Modal>
    <audio src="/audio/victory.mp3" ref="audio"></audio>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
const arrMes = ["剪刀", "石头", "布"];
const imgs = { 剪刀: "paper.svg", 石头: "rock.svg", 布: "scissors.svg" };
export default {
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      value: "",
      placeholder: "",
      history: [],
      computerValue: "布",
      myScore: 0,
      computerScore: 0,
      showLove: false,
      closeTimer: null,
      visible: false,
      audio: null,
      dsName: "电脑",
      nameList: ["电脑", "老公"],
      showName: false,
      newName: "",
    };
  },
  computed: {
    duration() {
      return this.$store.state.duration;
    },
  },
  created() {
    // this.arrMes = ["剪刀", "石头", "布"];
  },
  mounted() {
    let doc = document.querySelector("#myBox");
    doc.addEventListener("keydown", this.keydownFun);
  },
  methods: {
    keydownFun(e) {
      if (e.keyCode == "13") {
        if (!this.value) {
          this.placeholder = "请输入你的拳！";
          return;
        }
        const realBox = this.checkBox(this.value);
        let result;
        switch (realBox.num) {
          case 0:
            this.placeholder = "请输入正确的拳！";
            break;
          case 1:
            this.getComputerValue(); //先获取电脑出的拳再比较！
            result = this.getResult(realBox.value);
            this.history.push({
              myBox: realBox.value,
              result: result,
              myImg: imgs[realBox.value],
              computerImg: imgs[this.computerValue],
            });
            this.placeholder = "";
            if (result === "你赢了") {
              this.play();
            }
            break;

          default:
            this.placeholder = "一次只能输入一种拳！";
            break;
        }
        this.init();
      }
    },
    //胜利动画
    play() {
      this.showLove = true;
      this.audioPlay();
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
      this.closeTimer = setTimeout(() => {
        if (this.showLove) {
          this.showLove = false;
        }
      }, this.duration);
    },
    init() {
      this.value = "";
      this.computerValue = "";
      this.$nextTick(() => {
        let content = document.querySelector(".content");
        content.scrollTop = content.scrollHeight;
      });
    },
    checkBox(box) {
      let num = 0;
      let realBox = {};
      for (const type of arrMes) {
        if (box.indexOf(type) != -1) {
          num++, (realBox.value = type);
        }
      }
      realBox.num = num;
      return realBox;
    },
    getComputerValue() {
      let min = 0,
        max = 3;
      this.computerValue = arrMes[parseInt(Math.random() * (max - min) - min)]; //等概率获取0,1,2
    },
    getResult(value) {
      let result = "";
      switch (value) {
        case "剪刀":
          switch (this.computerValue) {
            case "剪刀":
              result = "平局";
              break;
            case "石头":
              result = "你输了";
              break;
            case "布":
              result = "你赢了";
              break;
          }
          break;
        case "石头":
          switch (this.computerValue) {
            case "剪刀":
              result = "你赢了";
              break;
            case "石头":
              result = "平局";
              break;
            case "布":
              result = "你输了";
              break;
          }
          break;
        case "布":
          switch (this.computerValue) {
            case "剪刀":
              result = "你输了";
              break;
            case "石头":
              result = "你赢了";
              break;
            case "布":
              result = "平局";
              break;
          }
          break;
      }
      this.getScore(result);
      return result;
    },
    getScore(result) {
      switch (result) {
        case "平局":
          this.myScore += 1;
          this.computerScore += 1;
          break;
        case "你输了":
          this.computerScore += 1;
          break;
        case "你赢了":
          this.myScore += 1;
          break;

        default:
          break;
      }
    },
    clear() {
      this.myScore = 0;
      this.computerScore = 0;
      this.history = [];
      this.placeholder = "";
      this.init();
    },
    set() {
      this.visible = true;
    },
    setDuration(e) {
      let value;
      if (e.target.value) {
        value = parseInt(e.target.value);
      } else {
        value = 1;
      }
      if (value < 1) {
        value = 1;
      }
      this.$store.commit("setDuration", value * 1000);
    },
    audioPlay() {
      let audio = this.$refs.audio;
      audio.currentTime = 0;
      audio.play();
    },
    selcetName() {
      this.showName = true;
    },
    closeName() {
      this.showName = false;
    },
    getEvent() {
      this.closeName();
    },
    addName() {
      if (!this.newName.trim()) return (this.newName = "");
      this.nameList.push(this.newName);
      this.newName = "";
    },
  },
};
</script>
<style scoped>
p {
  margin: 10px;
}
.main-content {
  padding: 8px;
  height: calc(100vh - 30px);
  overflow: auto;
  background-color: #1e1e1e;
  color: #ccc;
  box-sizing: border-box;
  position: relative;
}
#myBox {
  background-color: #1e1e1e;
  color: #ccc;
  border: none;
  outline: none;
  font-size: 16px;
  flex: 1;
}
.inputbody {
  padding: 10px 0;
  border-top: 1px solid #ccc;
}
.clear {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  position: absolute;
  top: 128px;
  width: calc(100% - 16px);
  padding: 8px 0;
}
.clearBtn {
  color: #11a8cd;
  cursor: pointer;
}
.content {
  margin-top: 40px;
  height: calc(100% - 160px);
  overflow-y: auto;
}
.screen {
  display: flex;
  height: 120px;
  background-color: #fff;
  overflow: hidden;
}
.left_screen,
.right_screen {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  color: #1e1e1e;
}
.center_screen {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: #1e1e1e;
}
.left_Img,
.right_Img {
  position: absolute;
  width: 70px;
}
.left_Img {
  transform: rotate(90deg) translate(0, 50%);
  left: 50%;
  top: 33px;
  animation: 0.5s leftAnimation;
}
.right_Img {
  transform: rotate(270deg) translate(0, 50%);
  right: 50%;
  top: 33px;
  animation: 0.5s rightAnimation;
}
@keyframes leftAnimation {
  0% {
    left: -70px;
  }
  100% {
    left: 50%;
  }
}
@keyframes rightAnimation {
  0% {
    right: -70px;
  }
  100% {
    right: 50%;
  }
}
#iframeLove {
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  position: absolute;
}
.nameList {
  position: fixed;
  z-index: 9;
  text-align: left;
  padding: 0;
  margin: 0;
  margin-top: 5px;
  padding: 5px 0;
  background-color: #3c3c3c;
}
.nameitem {
  width: 100px;
  list-style: none;
  padding: 5px;
  color: #ccc;
}
.nameitem:hover {
  color: #fff;
  background-color: #1e1e1e;
}
.nameList > .active {
  color: #fff;
  background-color: #1e1e1e;
}
</style>
