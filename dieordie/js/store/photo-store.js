/**
 * Created by suvin on 2016/11/29.
 */
var ScrollBarStore = Object.assign({},new Eventable(),{
    onScroll:function(callback){
        this.on("load",callback)
    },
    emitScroll:function(e){
        this.emit("load",e);
    }
});