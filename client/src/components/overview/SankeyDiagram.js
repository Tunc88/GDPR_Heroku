import React, { Component } from "react";
import ReactSankey from "react-sankey";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

/*const createCustomNode = (chartConfig, node) => {
  return (
    <g key={node.id} transform={`translate(${node.x},${node.y})`}>
      <rect
        height={node.height}
        width={chartConfig.node.width}
        style={{
          stroke: "#ff5252",
          fill: "url(#custom-linear-gradient)",
          strokeWidth: "1px"
        }}
      />
      <text
        x={chartConfig.node.width / 2}
        y={node.height / 2}
        style={{
          fontSize: "20px",
          fill: "#b57272",
          textAnchor: "middle",
          alignmentBaseline: "central"
        }}
      >
        {`${node.title}`}
      </text>
    </g>
  );
};*/
const createNode = (title, value, id) => ({ title, value, id });
const createLink = (sourceId, targetId) => ({ sourceId, targetId });

/*const nodes = {
  "0": createNode("Brazil", 5091520, 0),
  "1": createNode("Portugal", 3967612, 1),
  "2": createNode("Spain", 3948389, 2),
  "3": createNode("England", 1974194, 3),
  "4": createNode("France", 1202, 4),
  "5": createNode("Canada", 1974184, 5),
  "6": createNode("Conversion", 348, 6),
  "7": createNode("Mexico", 3936731, 7),
  "8": createNode("USA", 1983806, 8),
  "9": createNode("Angola", 661228, 9),
  "10": createNode("Senegal", 199236, 10),
  "11": createNode("Conversion", 348, 11),
  "12": createNode("Morocco", 1983082, 12),
  "13": createNode("South Africa", 1290205, 13),
  "14": createNode("Italy", 348123, 14),
  "15": createNode("Conversion", 123, 15),
  "16": createNode("Mali", 1201, 16),
  "17": createNode("Conversion", 1302, 17),
  "18": createNode("Conversion", 1403, 18),
  "19": createNode("Conversion", 1504, 19),
  "20": createNode("Conversion", 1605, 20)
  createCustomNode(chartConfig, node1)
};*/

/*const links = [
  createLink(0, 1),
  createLink(1, 2),
  createLink(1, 7),
  createLink(1, 8),
  createLink(2, 3),
  createLink(2, 5),
  createLink(2, 16),
  createLink(3, 4),
  createLink(3, 17),
  createLink(3, 18),
  createLink(3, 19),
  createLink(3, 20),
  createLink(5, 6),
  createLink(7, 12),
  createLink(8, 9),
  createLink(8, 10),
  createLink(9, 11),
  createLink(12, 13),
  createLink(12, 14),
  createLink(13, 15)
];*/
const nodes2 = {
  0: {
    title: "Node 0",
    value: 10,
    id: "0"
  },
  1: {
    title: "S 1",
    value: 9,
    id: "1"
  },
  2: {
    title: "S 2",
    value: 8,
    id: "2"
  },
  3: {
    title: "T 3",
    value: 7,
    id: "3"
  },
  4: {
    title: "T 4",
    value: 3,
    id: "4"
  },
  5: {
    title: "P 5",
    value: 3,
    id: "5"
  },
  6: {
    title: "P 6",
    value: 3,
    id: "6"
  }
};
const links2 = [
  { sourceId: 0, targetId: 1 },
  { sourceId: 0, targetId: 2 },
  { sourceId: 1, targetId: 3 },
  { sourceId: 2, targetId: 4 },
  { sourceId: 3, targetId: 5 },
  { sourceId: 4, targetId: 5 }
  // { sourceId: 4, targetId: 5 },

  //{ sourceId: 2, targetId: 6 }
  // { sourceId: 3, targetId: 6 }
];

class SankeyDiagram extends React.Component {
  chartConfig = node => {
    const chartConfig = {
      padding: { top: 10, right: 0, bottom: 10, left: 0 },
      node: {
        width: 150,
        maxHeight: 150,
        minHeight: 55,
        rectMinHeight: 5,
        paddingBottom: 40
      },
      link: {
        width: 100
      }
    };
    return (
      <g key={node.id} transform={`translate(${node.x},${node.y})`}>
        <rect
          height={node.height}
          width={chartConfig.node.width}
          style={{
            stroke: "#ff5252",
            fill: "url(#custom-linear-gradient)",
            strokeWidth: "1px"
          }}
        />
        <text
          x={chartConfig.node.width / 2}
          y={node.height / 2}
          style={{
            fontSize: "20px",
            fill: "#b57272",
            textAnchor: "middle",
            alignmentBaseline: "central"
          }}
        >
          {`${node.title}`}
        </text>
      </g>
    );
  };
  render() {
    const chartConfig = {
      padding: { top: 10, right: 0, bottom: 10, left: 0 },
      //background: "blue",
      node: {
        width: 250,
        maxHeight: 150,
        minHeight: 55,
        rectMinHeight: 10,
        paddingBottom: 20
      },
      link: {
        width: 100
      }
    };

    let SankeyDiagramContent;
    const { patterns, loading } = this.props.pattern;
    if (patterns === null || loading || patterns.length === 0) {
      //alert("waiting1");
      SankeyDiagramContent = <Spinner />;
    } else {
      const { strategies, loading } = this.props.strategy;

      if (strategies === null || loading || strategies.length === 0) {
        // alert("waiting2");
        SankeyDiagramContent = <Spinner />;
      } else {
        // const strategies = this.props.strategy.strategies;
        //console.log("node1[0]");
        //console.log(node1[0]);
        var nodes = {
          0: {
            title: "Node 1",
            value: 20,
            id: "0"
          }
        };
        var links = [
          { sourceId: 0, targetId: 1 },
          { sourceId: 0, targetId: 2 },
          { sourceId: 0, targetId: 3 },
          { sourceId: 0, targetId: 4 },
          { sourceId: 0, targetId: 5 },
          { sourceId: 0, targetId: 6 },
          { sourceId: 0, targetId: 7 },
          { sourceId: 0, targetId: 8 }
        ];

        var strategyCounter = 1;
        var tacticCounter = 9;
        strategies.forEach(strategy => {
          if (strategyCounter == 1) {
            nodes[strategyCounter] = {
              title: strategy.name,
              value: 10,
              id: strategyCounter.toString()
            };
          } else {
            nodes[strategyCounter] = {
              title: strategy.name,
              value: 10,
              id: strategyCounter.toString()
            };
          }

          strategy.assignedTactics.forEach(tactic => {
            links.push({ sourceId: strategyCounter, targetId: tacticCounter });
            nodes[tacticCounter] = {
              title: tactic.name,
              value: 5,
              id: tacticCounter.toString()
            };

            tacticCounter++;
          });

          strategyCounter++;
        });
        console.log(nodes);
        console.log(links);
        var patternCounter = tacticCounter + 1;
        patterns.forEach(pattern => {
          nodes[patternCounter] = {
            title: pattern.name,
            value: 5,
            id: patternCounter.toString()
          };
          pattern.assignedStrategiesWithAllTactics.forEach(strategy => {
            strategy.assignedTactics.forEach(tactic => {
              for (let index = 0; index < Object.keys(nodes).length; index++) {
                //alert(nodes);
                console.log(nodes[index].title);

                console.log(tactic.name);
                console.log(typeof nodes[index].title);
                console.log(typeof tactic.name);
                if (nodes[index].title == tactic.name) {
                  console.log("Treffer");
                  console.log(nodes[0].title);
                  console.log(tactic.name);
                  links.push({
                    sourceId: Number(nodes[index].id),
                    targetId: patternCounter
                  });
                  index = Object.keys(nodes).length;
                }
              }
            });
          });
          patternCounter++;
        });
        /*  var nodes3 = nodes[0]; 
    var nodes4 = nodes[1];
    nodes = { nodes3, nodes4 };*/
        // links = links.slice(0, 2);
        /* nodes = {
        0: nodes[0],
        1: nodes[1],
        2: nodes[2]
        /*3: nodes[3],
      4: nodes[4],
      5: nodes[5],
      6: nodes[6],
      7: nodes[7],
      8: nodes[8],
      9: nodes[9],
      10: nodes[10],
      11: nodes[11],
      12: nodes[12],
      13: nodes[13]
      };*/
        console.log("nodes");
        console.log(nodes);

        console.log("links");
        console.log(links);
        console.log("nodes2");
        console.log(nodes2);

        console.log("links2");
        console.log(links2);
        console.log(nodes[0]);
        SankeyDiagramContent = (
          <ReactSankey
            rootID={"0"}
            nodes={nodes2}
            links={links2}
            chartConfig={chartConfig}
          />
        );
      }
    }
    //console.log(strategies);

    return <div class="crop">{SankeyDiagramContent}</div>;
    //return <div />;
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  pattern: state.pattern,
  strategy: state.strategy
});

export default connect(
  mapStateToProps,
  {}
)(SankeyDiagram);
