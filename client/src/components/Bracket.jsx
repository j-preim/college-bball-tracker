import { useState, useEffect } from "react";


export default function Bracket() {
  return (
    <>
      <table className="brackets table mt-4" cellSpacing="0" id="brackets" align="center">
        <tbody>
          <tr>
            <td className="vtop border-bottom border-dark">1. N. Carolina 90</td>
            <td className="topwinner"></td>
            <td className=""></td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>
            <td className=""></td>
            <td className="topwinner"></td>
            <td className="vtop border-bottom border-dark">1. Houston 86</td>
          </tr>

          <tr>
            <td className="bottom1 border-bottom border-end border-dark" id="game16">
              16. Wagner 62
            </td>
            <td className="vtop border-bottom border-dark">1. N. Carolina 85</td>
            <td className=""></td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>
            <td className=""></td>
            <td className="vtop">1. Houston 0</td>
            <td className="bottom" id="game31">
              16. Longwood 46
            </td>
          </tr>

          <tr>
            <td className="top1 border-bottom border-dark" id="game17">
              8. Miss State 51
            </td>
            <td className="bottom1 border-bottom border-right border-dark" id="game24">
              9. Michigan St 69
            </td>
            <td className="topwinner"></td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>
            <td className="topwinner"></td>
            <td className="bottom" id="game39">
              9. Texas A&amp;M 0
            </td>
            <td className="top" id="game32">
              8. Nebraska 83
            </td>
          </tr>

          <tr>
            <td className="vbottom" id="game17">
              9. Michigan St 69
            </td>

            <td className="spacer11 bottomwinner" id="game"></td>
            <td className="vtop">1. N. Carolina 0</td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>
            <td className="vtop"></td>

            <td className="spacer1 bottomwinner" id="game"></td>
            <td className="vbottom" id="game32">
              9. Texas A&amp;M 98
            </td>
          </tr>

          <tr>
            <td className="vtop">5. St Marys 66</td>

            <td className="spacer11 topwinner" id="game"></td>
            <td className="bottom1" id="game28"></td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>
            <td className="bottom" id="game43"></td>

            <td className="spacer1 topwinner" id="game"></td>
            <td className="vtop">5. Wisconsin 61</td>
          </tr>

          <tr>
            <td className="bottom1" id="game18">
              12. Grand Canyon 75
            </td>
            <td className="top1" id="game25">
              12. Grand Canyon 0
            </td>

            <td className="spacer11 bottomwinner" id="game"></td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>

            <td className="spacer1 bottomwinner" id="game"></td>
            <td className="top" id="game40">
              12. J Madison 0
            </td>
            <td className="bottom" id="game33">
              12. J Madison 72
            </td>
          </tr>

          <tr>
            <td className="top1" id="game19">
              4. Alabama 109
            </td>
            <td className="vbottom" id="game25">
              4. Alabama 0
            </td>

            <td className="spacer11" id="game"></td>
            <td className="topwinner"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="topwinner"></td>

            <td className="spacer1" id="game"></td>
            <td className="vbottom" id="game40">
              4. Duke 0
            </td>
            <td className="top" id="game34">
              4. Duke 64
            </td>
          </tr>

          <tr>
            <td className="vbottom" id="game19">
              13. Charleston 96
            </td>
            <td className="bottomwinner"></td>
            <td rowSpan="2" className="regionname1">
              <span>West</span>
            </td>
            <td className="vtop"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="vtop"></td>
            <td rowSpan="2" className="regionname">
              <span>South</span>
            </td>
            <td className="bottomwinner"></td>
            <td className="vbottom" id="game34">
              13. Vermont 47
            </td>
          </tr>

          <tr>
            <td className="vtop">3. Baylor 92</td>
            <td className="topwinner"></td>
            <td className="bottom1" id="game30"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="bottom" id="game45"></td>
            <td className="topwinner"></td>
            <td className="vtop">3. Kentucky 76</td>
          </tr>

          <tr>
            <td className="bottom1" id="game20">
              14. Colgate 67
            </td>
            <td className="vtop">3. Baylor 0</td>

            <td className="spacer11" id="game"></td>

            <td className="spacer11 bottomwinner" id="game"></td>

            <td colSpan="3"></td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1 bottomwinner" id="game"></td>

            <td className="spacer1" id="game"></td>
            <td className="vtop">14. Oakland 0</td>
            <td className="bottom" id="game35">
              14. Oakland 80
            </td>
          </tr>

          <tr>
            <td className="top1" id="game21">
              6. Clemson 77
            </td>
            <td className="bottom1" id="game26">
              6. Clemson 0
            </td>

            <td className="spacer11 topwinner" id="game"></td>

            <td className="spacer11" id="game"></td>

            <td colSpan="3" className="final4team vtop"></td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1" id="game"></td>

            <td className="spacer1 topwinner" id="game"></td>
            <td className="bottom" id="game41">
              11. NC State 0
            </td>
            <td className="top" id="game36">
              6. Texas Tech 67
            </td>
          </tr>

          <tr>
            <td className="vbottom" id="game21">
              11. New Mexico 56
            </td>

            <td className="spacer11 bottomwinner" id="game"></td>
            <td className="top1" id="game29"></td>

            <td className="spacer11" id="game"></td>

            <td colSpan="3" className="final4team bottom1"></td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1" id="game"></td>
            <td className="top" id="game44"></td>

            <td className="spacer1 bottomwinner" id="game"></td>
            <td className="vbottom" id="game36">
              11. NC State 80
            </td>
          </tr>

          <tr>
            <td className="vtop">7. Dayton 63</td>

            <td className="spacer11 topwinner" id="game"></td>
            <td className="vbottom" id="game29">
              2. Arizona 0
            </td>

            <td className="spacer11" id="game"></td>

            <td colSpan="3"></td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1" id="game"></td>
            <td className="vbottom" id="game44"></td>

            <td className="spacer1 topwinner" id="game"></td>
            <td className="vtop">7. Florida 100</td>
          </tr>

          <tr>
            <td className="bottom1" id="game22">
              10. Nevada 60
            </td>
            <td className="top1" id="game27">
              7. Dayton 68
            </td>
            <td className="bottomwinner"></td>

            <td className="spacer11" id="game"></td>

            <td className="regionspacer">&nbsp;</td>
            <td colSpan="4" className="finalteam">
              {" "}
            </td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1" id="game"></td>
            <td className="bottomwinner"></td>
            <td className="top" id="game42">
              10. Colorado 0
            </td>
            <td className="bottom" id="game37">
              10. Colorado 102
            </td>
          </tr>

          <tr>
            <td className="top1" id="game23">
              2. Arizona 85
            </td>
            <td className="vbottom" id="game27">
              2. Arizona 78
            </td>
            <td className=""></td>

            <td className="spacer11" id="game"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1" id="game"></td>
            <td className=""></td>
            <td className="vbottom" id="game42">
              2. Marquette 0
            </td>
            <td className="top" id="game38">
              2. Marquette 87
            </td>
          </tr>

          <tr>
            <td className="vbottom" id="game23">
              15. Long Beach s 65
            </td>
            <td className="bottomwinner"></td>
            <td className=""></td>

            <td className="spacer11" id="game"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1" id="game"></td>
            <td className=""></td>
            <td className="bottomwinner"></td>
            <td className="vbottom" id="game38">
              15. Western Ky 69
            </td>
          </tr>

          <tr>
            <td>&nbsp;</td>

            <td>&nbsp;</td>

            <td>&nbsp;</td>

            <td className="spacer11">&nbsp;</td>

            <td>
              FINAL: &nbsp;
            </td>

            <td colSpan="4" className="champion">
              <div>&nbsp;</div>
            </td>

            <td className="spacer11">&nbsp;</td>

            <td>&nbsp;</td>

            <td>&nbsp;</td>

            <td>&nbsp;</td>

            <td>&nbsp;</td>
          </tr>

          <tr>
            <td className="vtop">1. Connecticut 91</td>
            <td className="topwinner"></td>
            <td className=""></td>

            <td className="spacer11" id="game"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1" id="game"></td>
            <td className=""></td>
            <td className="topwinner"></td>
            <td className="vtop">1. Purdue 78</td>
          </tr>

          <tr>
            <td className="bottom1" id="game1">
              16. Stetson 52
            </td>
            <td className="vtop">1. Connecticut 0</td>
            <td className=""></td>

            <td className="spacer11" id="game"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1" id="game"></td>
            <td className=""></td>
            <td className="vtop">1. Purdue 0</td>
            <td className="bottom" id="game46">
              16. Grambling 50
            </td>
          </tr>

          <tr>
            <td className="top1" id="game2">
              8. FAU 65
            </td>
            <td className="bottom1" id="game9">
              9. Northwestern 0
            </td>
            <td className="topwinner"></td>

            <td className="spacer11" id="game"></td>

            <td className="regionspacer">&nbsp;</td>
            <td colSpan="4" className="finalteam">
              {" "}
            </td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1" id="game"></td>
            <td className="topwinner"></td>
            <td className="bottom" id="game54">
              8. Utah St 0
            </td>
            <td className="top" id="game47">
              8. Utah St 88
            </td>
          </tr>

          <tr>
            <td className="vbottom" id="game2">
              9. Northwestern 77
            </td>

            <td className="spacer11 bottomwinner" id="game"></td>
            <td className="vtop"></td>

            <td className="spacer11" id="game"></td>

            <td className="regionspacer">&nbsp;</td>
            <td colSpan="4" className="spacer112"></td>
            <td className="regionspacer">&nbsp;</td>

            <td className="spacer1" id="game"></td>
            <td className="vtop"></td>

            <td className="spacer1 bottomwinner" id="game"></td>
            <td className="vbottom" id="game47">
              9. TCU 72
            </td>
          </tr>

          <tr>
            <td className="vtop">5. San Diego St 69</td>

            <td className="spacer11 topwinner" id="game"></td>
            <td className="bottom1" id="game13"></td>

            <td className="spacer11" id="game"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td colSpan="3" className="final4team top"></td>

            <td className="spacer1" id="game"></td>
            <td className="bottom" id="game58">
              5. Gonzaga 0
            </td>

            <td className="spacer1 topwinner" id="game"></td>
            <td className="vtop">5. Gonzaga 86</td>
          </tr>

          <tr>
            <td className="bottom1" id="game3">
              12. UAB 65
            </td>
            <td className="top1" id="game10">
              5. San Diego St 0
            </td>

            <td className="spacer11 bottomwinner" id="game"></td>

            <td className="spacer11" id="game"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td colSpan="3" className="final4team"></td>

            <td className="spacer1" id="game"></td>

            <td className="spacer1 bottomwinner" id="game"></td>
            <td className="top" id="game55">
              5. Gonzaga 89
            </td>
            <td className="bottom" id="game48">
              12. McNeese St 65
            </td>
          </tr>

          <tr>
            <td className="top1" id="game4">
              4. Auburn 76
            </td>
            <td className="vbottom" id="game10">
              13. Yale 0
            </td>

            <td className="spacer11" id="game"></td>

            <td className="spacer11 topwinner" id="game"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td colSpan="3"></td>

            <td className="spacer1 topwinner" id="game"></td>

            <td className="spacer1" id="game"></td>
            <td className="vbottom" id="game55">
              4. Kansas 68
            </td>
            <td className="top" id="game49">
              4. Kansas 93
            </td>
          </tr>

          <tr>
            <td className="vbottom" id="game4">
              13. Yale 78
            </td>
            <td className="bottomwinner"></td>
            <td rowSpan="2" className="regionname1">
              <span>East</span>
            </td>
            <td className="top1" id="game15"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="top" id="game60"></td>
            <td rowSpan="2" className="regionname">
              <span>Midwest</span>
            </td>
            <td className="bottomwinner"></td>
            <td className="vbottom" id="game49">
              13. Samford 89
            </td>
          </tr>

          <tr>
            <td className="vtop">3. Illinois 85</td>
            <td className="topwinner"></td>
            <td className="vbottom" id="game15"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="vbottom" id="game60"></td>
            <td className="topwinner"></td>
            <td className="vtop">3. Creighton 77</td>
          </tr>

          <tr>
            <td className="bottom1" id="game5">
              14. Morehead St 69
            </td>
            <td className="vtop">3. Illinois 0</td>

            <td className="spacer11" id="game"></td>
            <td className="bottomwinner"></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="bottomwinner"></td>

            <td className="spacer1" id="game"></td>
            <td className="vtop">3. Creighton 0</td>
            <td className="bottom" id="game50">
              14. Akron 60
            </td>
          </tr>

          <tr>
            <td className="top1" id="game6">
              6. BYU 67
            </td>
            <td className="bottom1" id="game11">
              11. Duquesne 0
            </td>

            <td className="spacer11 topwinner" id="game"></td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>

            <td className="spacer1 topwinner" id="game"></td>
            <td className="bottom" id="game56">
              11. Oregon 0
            </td>
            <td className="top" id="game51">
              6. S. Carolina 73
            </td>
          </tr>

          <tr>
            <td className="vbottom" id="game6">
              11. Duquesne 71
            </td>

            <td className="spacer11 bottomwinner" id="game"></td>
            <td className="top1" id="game14"></td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>
            <td className="top" id="game59"></td>

            <td className="spacer1 bottomwinner" id="game"></td>
            <td className="vbottom" id="game51">
              11. Oregon 87
            </td>
          </tr>

          <tr>
            <td className="vtop">7. Wash State 66</td>

            <td className="spacer11 topwinner" id="game"></td>
            <td className="vbottom" id="game14">
              2. Iowa St 0
            </td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>
            <td className="vbottom" id="game59"></td>

            <td className="spacer1 topwinner" id="game"></td>
            <td className="vtop">7. Texas 56</td>
          </tr>

          <tr>
            <td className="bottom1" id="game7">
              10. Drake 61
            </td>
            <td className="top1" id="game12">
              7. Wash State 56
            </td>
            <td className="bottomwinner"></td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>
            <td className="bottomwinner"></td>
            <td className="top" id="game57">
              7. Texas 0
            </td>
            <td className="bottom" id="game52">
              10. Colorado St 44
            </td>
          </tr>

          <tr>
            <td className="top1" id="game8">
              2. Iowa St 82
            </td>
            <td className="vbottom" id="game12">
              2. Iowa St 67
            </td>
            <td className=""></td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>
            <td className=""></td>
            <td className="vbottom" id="game57">
              2. Tennessee 0
            </td>
            <td className="top" id="game53">
              2. Tennessee 83
            </td>
          </tr>

          <tr>
            <td className="vbottom" id="game8">
              15. S Dakota St 65
            </td>
            <td className="bottomwinner"></td>
            <td className=""></td>
            <td className=""></td>

            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className="regionspacer">&nbsp;</td>
            <td className=""></td>
            <td className=""></td>
            <td className="bottomwinner"></td>
            <td className="vbottom" id="game53">
              15. St Peters 49
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
