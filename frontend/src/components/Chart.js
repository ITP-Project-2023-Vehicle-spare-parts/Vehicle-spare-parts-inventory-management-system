import React from "react";
import Chart from 'react-apexcharts'

export default function chart() {

    return(
        <div>
            

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           
            
            <center>
            <Chart  type ="bar"
            width = {1100}
            hight={1000}
            
            
           
            series={[
               
                {
                    name: 'Bajaj',
                    color:'#00FF00',
                    data: [
                      {
                        x: 'January',
                        y: 5292,
                        goals: [
                          {
                            name: 'Low Stock',
                            value: 1400,
                            strokeHeight: 5,
                            
                            strokeColor: '#FF0000'
                          }
                        ]
                      },
                      {
                          x: 'February',
                          y: 1502,
                          goals: [
                            {
                              name: 'Expected',
                              value: 1400,
                              strokeHeight: 5,
                              strokeColor: '#FF0000'
                            }
                          ]
                        },
                        {
                          x: 'March',
                          y: 8992,
                          goals: [
                            {
                              name: 'Expected',
                              value: 1400,
                              strokeHeight: 5,
                              strokeColor: '#FF0000'
                            }
                          ]
                        },
                        {
                          x: 'April',
                          y: 692,
                          goals: [
                            {
                              name: 'Expected',
                              value: 1400,
                              strokeHeight: 5,
                              strokeColor: '#FF0000'
                            }
                          ]
                        },
                        {
                          x: 'May',
                          y: 1292,
                          goals: [
                            {
                              name: 'Expected',
                              value: 1400,
                              strokeHeight: 5,
                              strokeColor: '#FF0000'
                            }
                          ]
                        },
                      {
                        x: 'June',
                        y: 4432,
                        goals: [
                          {
                            name: 'Expected',
                            value: 5400,
                            strokeHeight: 5,
                            strokeColor: '#FF0000'
                          }
                        ]
                      },
                      {
                        x: 'July',
                        y: 823,
                        goals: [
                          {
                            name: 'Expected',
                            value: 5200,
                            strokeHeight: 5,
                            strokeColor: '#FF0000'
                          }
                        ]
                      },
                      {
                        x: 'August',
                        y: 653,
  
                        goals: [
                          {
                            name: 'Expected',
                            value: 6500,
                            strokeHeight: 5,
                            strokeColor: '#FF0000'
                          }
                        ]
                      },
                      {
                        x: 'September',
                        y: 8133,
                        goals: [
                          {
                            name: 'Expected',
                            value: 6600,
                            strokeHeight: 5,
                            strokeColor: '#FF0000'
                          }
                        ]
                      },
                      {
                        x: 'October',
                        y: 7132,
                        goals: [
                          {
                            name: 'Expected',
                            value: 7500,
                            strokeHeight: 5,
                            strokeColor: '#FF0000'
                          }
                        ]
                      },
                      {
                        x: 'November',
                        y: 7932,
                        goals: [
                          {
                            name: 'Expected',
                            value: 8700,
                            strokeHeight: 5,
                            strokeColor: '#FF0000'
                          }
                        ]
                      },
                      {
                        x: 'December',
                        y: 6553,
                        goals: [
                          {
                            name: 'Expected',
                            value: 7300,
                            strokeHeight: 5,
                            strokeColor: '#FF0000'
                          }
                        ]
                      }
                    ]
                  }
              ]}
            options={{
                colors: ['#00E396'],
                dataLabels: {
                  enabled: false
                },

              theme:{
                mode:'dark'

              },
              chart: {
                height: '350px',
                width:'350px',
                type: 'bar'
              },

              tooltip: {
                followCursor:true,
              },

              noData : {
                text : "Empty Chart!",
                style: {
                  fontSize :'30px'
                }
                
              },

            
             
             
              legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
                markers: {
                  fillColors: ['#FF0000']
                }
              },
              subtitle:{
                text:'This is chart Shows Data of Monthly Stock Leval',
                style: {
                  color:"White",
                  fontWeight:'2000'
                }
              },
              xaxis: {
                tickPlacement:'on',
                title: {
                  text:'Months',
                  style:{
                    color:'White'
                  }
                }
              },
            
              title : {
                text:'Monthly Stock Lavel',
                style:{
                  fontSize:20
                }
              },
           
             


            }}
            ></Chart>

</center>

        </div>
    )

}

