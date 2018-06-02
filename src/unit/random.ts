
/**
 * @desc 产生随机值
 */
class Random {
  private ENG = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y','Z']
  private eng = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y','z']
  private num = ['1','2','3','4','5','6','7','8','9','0']
  private getTypedArray (pow: number) {
    if (pow <= 8) {
      return new Uint8Array(10)
    }
    else if (pow <= 16) {
      return new Uint16Array(10)
    }
    else {
      return new Uint32Array(10)
    }
  }
  private getSeed (pow: 8|16|32) {
    if (crypto && crypto.getRandomValues && Float64Array) {
      // 密码学随机数可用
      const typedArray = this.getTypedArray(pow)
      crypto.getRandomValues(typedArray)
      return typedArray
    } else {
      // 回退Math随机数获取
      const array = new Array(10)
      array.forEach((value, index) => {
        value = Math.floor(Math.random() * (2 ** pow))
      })
      return Math.random()
    }
  }
}

export default Random