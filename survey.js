//2732 x 2048
var h = window.innerHeight
var w = window.innerWidth
console.log([h,w])
var questions = 90
var people = 487
var grid = d3.min([h/(people/2+2),w/(questions+2)/2])
var descriptions = {
    liberal:"I think colored and white people should live together in housing projects. And on the whole, I think that colored and white in the village get along pretty well.",
    ambivalent:"I don’t think colored and white people should live together in housing projects. BUT on the whole, I think that colored and white in the village get along well.",
    illiberal:"I don’t think colored and white people should live together in housing projects. And on the whole, I don’t think that colored and white in the village get along."
    }       
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
            .attr("cx", d.column*w/5+w/4)
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
    d3.selectAll(".annotation").remove()
    d3.selectAll(".question").remove()
   
    d3.selectAll("circle")
    .each(function(d,i){
        if(d.q!=25 && d.q!=26){
            d3.select(this).transition().delay(Math.random()*5000)
            .attr("opacity",0)
        }else{
            d3.select(this).transition().delay(Math.random()*5000)
            .attr("class","twoQuestions")
        }
    })
    
   var questions25_26= d3.select("#annotaions").append("div")
            .attr("class","q25")
            .style("width","100%")

    
    questions25_26.append("img")
    .attr("src","q25_26.jpg").attr("width",w/2+"px")
    .style("margin-left",w/4+"px")
    .style("opacity",1)
    .style("margin-top","100px")
    
    
    
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
    
    d3.selectAll(".twoQuestions")
    .each(function(d,i){
        if(d.q!=25){
            d3.select(this).transition("consolidate-opacity").attr("opacity",0)
        }else{
            d3.select(this).attr("class","grouped").attr("opacity",1).attr("fill","black")
        }
    })
            
    d3.selectAll(".grouped")
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
    
    var chartDiv = d3.select("#questions")
        
        var offset = 0
        
        var checkPlacement = {
            liberal:[[390,220],[730,210]],
            ambivalent:[[390,220],[730,240]],
            illiberal:[[390,250],[730,240]]
        }
         
        for(var d in descriptions){
                        
            d3.select("body").append("div").attr("class","check").html("&#9747")
            .style("position","absolute")
            .style("left",checkPlacement[d][0][0]+"px")
            .style("top",checkPlacement[d][0][1]+"px")
            .style("opacity",0)
            .transition()
            .delay(offset*2000)
            .style("opacity",1)
            .on("end",function(){
                d3.select(this).transition().delay(2000).style("opacity",0)
            })
            d3.select("body").append("div").attr("class","check").html("&#9747")
            .style("position","absolute")
            .style("left",checkPlacement[d][1][0]+"px")
            .style("top",checkPlacement[d][1][1]+"px")
            .style("opacity",0)
            .transition()
            .delay(offset*2000)
            .style("opacity",1)
            .on("end",function(){
                d3.select(this).transition().delay(2000).style("opacity",0)
            })
            
            var count = d3.selectAll("."+d).size()
            var total = d3.selectAll(".grouped").size()
            var percent = Math.round(count/total*100)
            
            chartDiv.append("div")
            .attr("class",d+"_text question")
            .html("<span class=\"boldText\">"+d+"</span>"
                +"<br>"
            +descriptions[d]
                +"<br>"
            +"<span class=\"boldText\">"+count+"</span> people"
                +"<br>"
            +"<span class=\"boldText\">"+percent+"%</span> of population"
            )
            .style("position","absolute")
            .style("left",offset*(grid*10*2+grid*2)+w/4+"px")
            .style("top",h/3-50+"px")
            .style("width",10*grid*2+"px")
            .style("opacity",0)
            .transition()
            .delay(offset*2000)
            .style("opacity",1)
            offset+=1
        }
        
    
        for(var g in groups){
        var className = groups[g]
        d3.selectAll("."+className)
        .each(function(d,i){
            d3.select(this)
            .attr("opacity",0)
            .transition()
            .duration(1000)
            .delay(g*2000)
            .attr("r",d.r*2)
            .attr("cx",i%10*grid*2+(g*grid*2*11)+w/4)
            .attr("cy",Math.floor(i/10)*grid*2+grid*2+h/3+100)
            .attr("opacity",1)
            
        })
    }
}
function whiteFriendGrid(){
    console.log("friend")
    d3.selectAll(".check").remove()
    d3.selectAll(".question").remove()
    d3.selectAll(".q25").remove()
    
    
   var question39= d3.select("#questions").append("div")
            .attr("class","q39")
            .style("width","100%")

    
    question39.append("img")
    .attr("src","q39.jpg").attr("width",w/2+"px")
    .style("margin-left",w/4+"px")
    .style("opacity",1)
    .style("margin-top","70px")
    .style("width","550px")
    
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
        var total = d3.selectAll("."+group.split("_")[0]).size()
        var count = d3.selectAll("."+group).size()
        var percent = Math.round(count/total*100)
        
        d3.select("#questions").append("div").attr("class","question")
        .html(count +" "+percent)
        .style("position","absolute")
        .style("left",grid+Math.floor(gridNumber/3)*grid*2*11+w/4+"px")
        .style("top",grid+(gridNumber%3)*grid*11+h/3+"px")
        
        d3.selectAll("."+group)
            .each(function(d,i){
                console.log(d3.select(this).attr("class"))
                d3.select(this)
                .transition()
                .attr("cx",i%10*grid*2+grid+Math.floor(gridNumber/3)*grid*2*11+w/4)
                .attr("cy",Math.floor(i/10)*grid*2+grid+(gridNumber%3)*grid*2*11+h/3)
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
            }else{
                d3.select(this).classed("w_"+group,true)
            }
        })
        
    d3.selectAll(".b_"+group)
        .each(function(d,i){
            d3.select(this).transition()
                .delay(i*10).duration(2000)
                .ease(d3.easeBounce) 
                .attr("cy",1000)
        })

    updateTextRace("liberal")
}
function updateTextRace(group){
    var count = d3.selectAll(".w_"+group).size()
    var total = d3.selectAll(".w").size()
    var percent = Math.round(count/total*100)

    d3.select("."+group+"_text")
    .html("<span class=\"boldText\">"+group+"</span>"
        +"<br>"
    +descriptions[group]
        +"<br>"
    +"<span class=\"boldText\">"+count+"</span> white people"
        +"<br>"
    +"<span class=\"boldText\">"+percent+"%</span> of white population"
    )
}

function removeAmbivalent(){
    var group = "ambivalent"
    d3.selectAll("."+group)
        .each(function(d,i){
            if(d.race=="b"){
                d3.select(this).classed("b_"+group,true)
            }else{
                d3.select(this).classed("w_"+group,true)
                
            }
        })
        
    d3.selectAll(".b_"+group)
        .each(function(d,i){
            d3.select(this).transition()
                .delay(i*10).duration(2000)
                .ease(d3.easeBounce) 
                .attr("cy",1000)
        })
    updateTextRace("ambivalent")
    
}
function removeIlliberal(){
    var group = "illiberal"
    d3.selectAll("."+group)
        .each(function(d,i){
            if(d.race=="b"){
                d3.select(this).classed("b_"+group,true)
            }else{
                d3.select(this).classed("w_"+group,true)
                
            }
        })
        
    d3.selectAll(".b_"+group)
        .each(function(d,i){
            d3.select(this).transition()
                .delay(i*10).duration(2000)
                .ease(d3.easeBounce) 
                .attr("cy",1000)
        })
    updateTextRace("illiberal")
    
}

function showPerson(){
    d3.selectAll(".annotation").remove()
    
    d3.selectAll("circle")
    .each(function(d,i){
        if(d.p==200){
            d3.select(this)
            .transition()
            .delay(d.q*100)
            .attr("cx",function(d){
                return d.column*questions*grid+d.q*grid+grid
            })
            .attr("cy",function(d){
                return d.cy+grid
            })
            .attr("fill","red")
            .attr("opacity",function(d){return 1})
            
            var question = d3.select("#annotations").append("div")
            .attr("class","question")
            .style("width",w/4-10+"px")
            .style("height","20px")
            .style("display","inline-block")
            .style("visibility","hidden")
           // .html("question "+d.q)
            
            question.append("img")
            .attr("src","q"+(d.q%8+1)+".jpg")
            .attr("width",w/4-10+"px")
            .style("opacity",.4)
            
            question.transition().delay(d.q*100).style("visibility","visible")
        }
    })
    
    d3.select("#annotations").append("div")
    .html("A survey with 90 Questions")
    .attr("class","annotation")
}

function showAll(){
    d3.selectAll(".annotation").remove()
    d3.selectAll(".question").remove()
    
    d3.selectAll("circle")
    .each(function(d,i){
        d3.select(this)
        .transition()
        .delay(d.p+d.q*5)
        .attr("cx",function(d){
            return d.column*questions*grid+d.q*grid+grid
        })
        .attr("cy",function(d){
            return d.cy+grid
        })
        .attr("fill",function(d){return d.fill})
        .attr("opacity",function(d){return 1; return d.opacity})
       // .on("end",function(){
       //     d3.select(this)
       //     .attr("opacity",function(d){return d.opacity})
       // })
        
    })
    
    d3.select("#annotations").append("div")
    .html("A survey with 90 Questions<br/> given to 478 residents<br/>resulting in 43,020 data points")
    .attr("class","annotation")
    
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
                    column: p%2,
                    opacity:getOpacity(),
                    label:"label",
                    cy:Math.floor(p/2)*grid,
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
            return d.column*questions*grid+d.q*grid
        })
        .attr("cy",function(d){
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
    