//2732 x 2048
var h = 1024
var w = 1366
var questions = 45
var people = 487
var grid = d3.min([1366/(people/3+2),1024/(questions+2)/3])
       
//d3.select("#dots").on("click",function(){surveyDots()})

surveyDots()
//hideQuestions()
//consolidate()
    
function getOpacity(){
    return Math.random()+.3
  //  return Math.round(Math.random()*2)/2
}
function getFill(){
  //  return Math.random()+.1
    return "rgb("+Math.random()*250+","+Math.random()*250+","+Math.random()*250+")"
}
function dotGroups(){
    var groups = ["l","a","i"]
    var races = ["w","b"]
    //    var data = {
    //        l:{l:{b:190,w:37},a:{b:28,w:37},i:{b:0,w:8}},
    //        a:{l:{b:22,w:37},a:{b:6,w:52},i:{b:0,w:19}},
    //        i:{l:{b:1,w:10},a:{b:0,w:28},i:{b:0,w:12}}
    //    }
    //    
    
    var data = {
        llb:190,
        llw:37,
        lab:28,
        law:37,
        lib:0,
        liw:8,
        alb:22,
        alw:37,
        aab:6,
        aaw:52,
        aib:0,
        aiw:19,
        ilb:1,
        ilw:10,
        iab:0,
        iaw:28,
        iib:0,
        iiw:12
    }
    var listed = []
    for(var d in data){
        var key = d
        var value = data[d]
        for(var i =0; i<value;i++){
            listed.push(key)
        }
    }
    return shuffle(listed)
    
}
function getGroup(groups,p){
   return groups[p][0]
}
function getFriendGroup(groups,p){
   return groups[p][1]
}
function getRace(groups,p){
   return groups[p][2]
}

function shuffle(array) {
  var random = array.map(Math.random);
  array.sort(function(a, b) {
    return Math.random() - Math.random();
  });
  return array
}

function consolidate(){
    console.log("consolidate")
    
    d3.selectAll("circle")
    .each(function(d,i){
        d3.select(this)
            .transition("consolidate")
            .attr("cx", d.column*w/4+w/4)
            .on("end",function(){
                if(d.q!=22){
                    d3.select(this).transition("consolidate-opacity").attr("opacity",0)
                }else{
                    d3.select(this)
                    .transition("consolidate-opacity")
                    .attr("class","selected")
                    .transition("consolidate-black").delay(1000).attr("fill","black").attr("opacity",1)
                }
        })
    })
}
function hideQuestions(){
    d3.selectAll("circle")
    .each(function(d,i){
        if(d.q!=22 && d.q!=23&&d.q!=33){
            d3.select(this).transition().delay(Math.random()*1000)
            .attr("class","threeQuestions")
            .attr("opacity",0)
           
            //.on("end",function(){
            //   // d3.select(this).remove()                
            //})
        }
        
    })
}
function getFriendGroupClass(){
    var groups = ["l","a",'i']
    
    var friendGroups  = []
    for(var i in groups){
        for(var j in groups){
            friendGroups.push(groups[i]+"_"+groups[j])
        }
    }
    return friendGroups
}

function group(){
    console.log("group")
    d3.selectAll(".selected")
    .each(function(d,i){
        if(d.race=="w"){
            d3.select(this).classed("w",true)
        }
        if(d.group=="l"){
            d3.select(this).classed("liberal",true)
        }else if(d.group=="a"){
            d3.select(this).classed("ambivalent",true)
        }else{
            d3.select(this).classed("illiberal",true)
        }
    })
    
    var groups = ["liberal","ambivalent","illiberal"]
    
    for(var g in groups){
        var className = groups[g]
        d3.selectAll("."+className)
        .each(function(d,i){
            d3.select(this).transition()
            .attr("cx",i%10*grid+(g*grid*11)+grid*2)
            .attr("cy",Math.floor(i/10)*grid+grid*2)
        })
    }
}
function whiteFriendGrid(){
    console.log("friend")
    
    d3.selectAll(".w")
    .each(function(d,i){
            d3.select(this)
            .classed(d.group+"_"+d.friendGroup,true)
            .classed(d.group,true)
    })
   
    
    var friendGroups = getFriendGroupClass()
    
    for(var f in friendGroups){
        var group = friendGroups[f]
        var gridNumber = f
        console.log(d3.selectAll("."+group).size())
        
        d3.selectAll("."+group)
            .each(function(d,i){
                console.log(d3.select(this).attr("class"))
                d3.select(this)
                .transition()
                .attr("cx",i%10*grid+grid+Math.floor(gridNumber/3)*200)
                .attr("cy",Math.floor(i/10)*grid+grid+(gridNumber%3)*200)
            })
    }   
}
function hoFriendships(){
    d3.selectAll(".l_l").attr("fill","red")
    d3.selectAll(".a_a").attr("fill","red")
    d3.selectAll(".i_i").attr("fill","red")
}


function removeLiberal(){
    var group = "liberal"
    d3.selectAll("."+group)
        .each(function(d,i){
            if(d.race=="b"){
                d3.select(this).classed("b_"+group,true)
            }
        })
        
    d3.selectAll(".b_"+group)
        .each(function(d,i){
            d3.select(this).transition()
                .delay(i*10).duration(2000)
                .ease(d3.easeBounce) 
                .attr("cy",1000)
        })
    
}
function removeAmbivalent(){
    var group = "ambivalent"
    d3.selectAll("."+group)
        .each(function(d,i){
            if(d.race=="b"){
                d3.select(this).classed("b_"+group,true)
            }
        })
        
    d3.selectAll(".b_"+group)
        .each(function(d,i){
            d3.select(this).transition()
                .delay(i*10).duration(2000)
                .ease(d3.easeBounce) 
                .attr("cy",1000)
        })
    
}
function removeIlliberal(){
    var group = "illiberal"
    d3.selectAll("."+group)
        .each(function(d,i){
            if(d.race=="b"){
                d3.select(this).classed("b_"+group,true)
            }
        })
        
    d3.selectAll(".b_"+group)
        .each(function(d,i){
            d3.select(this).transition()
                .delay(i*10).duration(2000)
                .ease(d3.easeBounce) 
                .attr("cy",1000)
        })
    
}

function showPerson(){
    d3.selectAll("circle")
    .each(function(d,i){
        if(d.p==100){
            d3.select(this)
            .transition()
            .delay(i)
            .attr("cx",function(d){
                return d.column*questions*grid+d.q*grid+grid
            })
            .attr("cy",function(d){
                return d.cy+grid
            })
            .attr("fill","red")
            .attr("opacity",function(d){return d.opacity})
            
        }
    })
}

function showAll(){
    d3.selectAll("circle")
    .each(function(d,i){
        d3.select(this)
        .transition()
        .delay(function(){return d.p*10})
        .attr("cx",function(d){
            return d.column*questions*grid+d.q*grid+grid
        })
        .attr("cy",function(d){
            return d.cy+grid
        })
        .on("end",function(){
            d3.select(this)
            .attr("opacity",function(d){return d.opacity})
        })
        
    })
}
function surveyDots(){
        var svg = d3.select("#chart1").append("svg").attr("width", w).attr("height", h)
        var points = []
        var groups = dotGroups()
        for(var q = 0; q<questions; q++){
            for(var p = 0; p<people; p++){
                points.push({
                    q:q,
                    p:p,
                    column: p%3,
                    opacity:getOpacity(),
                    label:"label",
                    cy:Math.floor(p/3)*grid,
                    r:grid/2*.8,
                    fill:getFill(),
                    group:getGroup(groups, p),
                    race:getRace(groups, p),
                    friendGroup:getFriendGroup(groups, p)
                })
            }
        }
        var tip = d3.tip()
          .offset([-8, 0])
          .attr("class", "d3-tip")
        
        svg.call(tip)
        
        svg.selectAll(".point")
        .data(points)
        .enter()
        .append("circle")
        .attr("cx",function(d){
            return -20
            return d.column*questions*grid+d.q*grid
        })
        .attr("cy",function(d){
            return -20
            return d.cy
        })
        .attr("r",function(d){return d.r})
        .attr("fill",function(d){return d.fill})
        .attr("opacity",function(d){return 0; return d.opacity})
        .attr("cursor","pointer")
        .on("mouseover",function(d){
            tip.html(d.p+d.race)
            tip.show()
        })
        .on("mouseout",function(d){
            tip.hide()
        })
}
    