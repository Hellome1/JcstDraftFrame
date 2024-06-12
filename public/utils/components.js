function TalkingTheSame(std, target) {
  this.std = std;
  this.target = target;
  this.result = this.judge(std, target);
}

TalkingTheSame.prototype = {
  constructor: TalkingTheSame,
  judge: function(std, target) {
    return target.indexOf(std) > -1;
  }
}

function Dicts() {}
Dicts.logDict = {
  '[TDline.vue 182]': false,
  '[meidcalOrder.vue 156]': true,
  '[medicalOrder.vue 173]': true,
  // '[medicalOrder.vue 205]': true,
  '[medicalOrder.vue 224]': true,
  // '[nursing.vue 133]': true,
  '[vitalsign.vue 204]': true,
  '[timeline.js 154]': true,
  '[index.vue 121]': true
}
