import { useState, useEffect } from "react";


export default function Bracket() {
  return (
    <>
      <table class="brackets" cellspacing="0" id="brackets" align="center">
        <tbody>
          <tr>
            <td class="vtop">1. N. Carolina 90</td>
            <td class="topwinner"></td>
            <td class=""></td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>
            <td class=""></td>
            <td class="topwinner"></td>
            <td class="vtop">1. Houston 86</td>
          </tr>

          <tr>
            <td class="bottom1" id="game16">
              16. Wagner 62
            </td>
            <td class="vtop">1. N. Carolina 85</td>
            <td class=""></td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>
            <td class=""></td>
            <td class="vtop">1. Houston 0</td>
            <td class="bottom" id="game31">
              16. Longwood 46
            </td>
          </tr>

          <tr>
            <td class="top1" id="game17">
              8. Miss State 51
            </td>
            <td class="bottom1" id="game24">
              9. Michigan St 69
            </td>
            <td class="topwinner"></td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>
            <td class="topwinner"></td>
            <td class="bottom" id="game39">
              9. Texas A&amp;M 0
            </td>
            <td class="top" id="game32">
              8. Nebraska 83
            </td>
          </tr>

          <tr>
            <td class="vbottom" id="game17">
              9. Michigan St 69
            </td>

            <td class="spacer11 bottomwinner" id="game"></td>
            <td class="vtop">1. N. Carolina 0</td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>
            <td class="vtop"></td>

            <td class="spacer1 bottomwinner" id="game"></td>
            <td class="vbottom" id="game32">
              9. Texas A&amp;M 98
            </td>
          </tr>

          <tr>
            <td class="vtop">5. St Marys 66</td>

            <td class="spacer11 topwinner" id="game"></td>
            <td class="bottom1" id="game28"></td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>
            <td class="bottom" id="game43"></td>

            <td class="spacer1 topwinner" id="game"></td>
            <td class="vtop">5. Wisconsin 61</td>
          </tr>

          <tr>
            <td class="bottom1" id="game18">
              12. Grand Canyon 75
            </td>
            <td class="top1" id="game25">
              12. Grand Canyon 0
            </td>

            <td class="spacer11 bottomwinner" id="game"></td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>

            <td class="spacer1 bottomwinner" id="game"></td>
            <td class="top" id="game40">
              12. J Madison 0
            </td>
            <td class="bottom" id="game33">
              12. J Madison 72
            </td>
          </tr>

          <tr>
            <td class="top1" id="game19">
              4. Alabama 109
            </td>
            <td class="vbottom" id="game25">
              4. Alabama 0
            </td>

            <td class="spacer11" id="game"></td>
            <td class="topwinner"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="topwinner"></td>

            <td class="spacer1" id="game"></td>
            <td class="vbottom" id="game40">
              4. Duke 0
            </td>
            <td class="top" id="game34">
              4. Duke 64
            </td>
          </tr>

          <tr>
            <td class="vbottom" id="game19">
              13. Charleston 96
            </td>
            <td class="bottomwinner"></td>
            <td rowspan="2" class="regionname1">
              <span style="padding:4px 16px;">West</span>
            </td>
            <td class="vtop"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="vtop"></td>
            <td rowspan="2" class="regionname">
              <span style="padding:4px 16px;">South</span>
            </td>
            <td class="bottomwinner"></td>
            <td class="vbottom" id="game34">
              13. Vermont 47
            </td>
          </tr>

          <tr>
            <td class="vtop">3. Baylor 92</td>
            <td class="topwinner"></td>
            <td class="bottom1" id="game30"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="bottom" id="game45"></td>
            <td class="topwinner"></td>
            <td class="vtop">3. Kentucky 76</td>
          </tr>

          <tr>
            <td class="bottom1" id="game20">
              14. Colgate 67
            </td>
            <td class="vtop">3. Baylor 0</td>

            <td class="spacer11" id="game"></td>

            <td class="spacer11 bottomwinner" id="game"></td>

            <td colspan="3"></td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1 bottomwinner" id="game"></td>

            <td class="spacer1" id="game"></td>
            <td class="vtop">14. Oakland 0</td>
            <td class="bottom" id="game35">
              14. Oakland 80
            </td>
          </tr>

          <tr>
            <td class="top1" id="game21">
              6. Clemson 77
            </td>
            <td class="bottom1" id="game26">
              6. Clemson 0
            </td>

            <td class="spacer11 topwinner" id="game"></td>

            <td class="spacer11" id="game"></td>

            <td colspan="3" class="final4team vtop"></td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1" id="game"></td>

            <td class="spacer1 topwinner" id="game"></td>
            <td class="bottom" id="game41">
              11. NC State 0
            </td>
            <td class="top" id="game36">
              6. Texas Tech 67
            </td>
          </tr>

          <tr>
            <td class="vbottom" id="game21">
              11. New Mexico 56
            </td>

            <td class="spacer11 bottomwinner" id="game"></td>
            <td class="top1" id="game29"></td>

            <td class="spacer11" id="game"></td>

            <td colspan="3" class="final4team bottom1"></td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1" id="game"></td>
            <td class="top" id="game44"></td>

            <td class="spacer1 bottomwinner" id="game"></td>
            <td class="vbottom" id="game36">
              11. NC State 80
            </td>
          </tr>

          <tr>
            <td class="vtop">7. Dayton 63</td>

            <td class="spacer11 topwinner" id="game"></td>
            <td class="vbottom" id="game29">
              2. Arizona 0
            </td>

            <td class="spacer11" id="game"></td>

            <td colspan="3"></td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1" id="game"></td>
            <td class="vbottom" id="game44"></td>

            <td class="spacer1 topwinner" id="game"></td>
            <td class="vtop">7. Florida 100</td>
          </tr>

          <tr>
            <td class="bottom1" id="game22">
              10. Nevada 60
            </td>
            <td class="top1" id="game27">
              7. Dayton 68
            </td>
            <td class="bottomwinner"></td>

            <td class="spacer11" id="game"></td>

            <td class="regionspacer">&nbsp;</td>
            <td colspan="4" class="finalteam">
              {" "}
            </td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1" id="game"></td>
            <td class="bottomwinner"></td>
            <td class="top" id="game42">
              10. Colorado 0
            </td>
            <td class="bottom" id="game37">
              10. Colorado 102
            </td>
          </tr>

          <tr>
            <td class="top1" id="game23">
              2. Arizona 85
            </td>
            <td class="vbottom" id="game27">
              2. Arizona 78
            </td>
            <td class=""></td>

            <td class="spacer11" id="game"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1" id="game"></td>
            <td class=""></td>
            <td class="vbottom" id="game42">
              2. Marquette 0
            </td>
            <td class="top" id="game38">
              2. Marquette 87
            </td>
          </tr>

          <tr>
            <td class="vbottom" id="game23">
              15. Long Beach s 65
            </td>
            <td class="bottomwinner"></td>
            <td class=""></td>

            <td class="spacer11" id="game"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1" id="game"></td>
            <td class=""></td>
            <td class="bottomwinner"></td>
            <td class="vbottom" id="game38">
              15. Western Ky 69
            </td>
          </tr>

          <tr>
            <td>&nbsp;</td>

            <td>&nbsp;</td>

            <td>&nbsp;</td>

            <td class="spacer11">&nbsp;</td>

            <td style="text-align:right;font-size:10pt;color:#163e67;font-weight:bold;">
              FINAL: &nbsp;
            </td>

            <td colspan="4" class="champion">
              <div>&nbsp;</div>
            </td>

            <td class="spacer11">&nbsp;</td>

            <td>&nbsp;</td>

            <td>&nbsp;</td>

            <td>&nbsp;</td>

            <td>&nbsp;</td>
          </tr>

          <tr>
            <td class="vtop">1. Connecticut 91</td>
            <td class="topwinner"></td>
            <td class=""></td>

            <td class="spacer11" id="game"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1" id="game"></td>
            <td class=""></td>
            <td class="topwinner"></td>
            <td class="vtop">1. Purdue 78</td>
          </tr>

          <tr>
            <td class="bottom1" id="game1">
              16. Stetson 52
            </td>
            <td class="vtop">1. Connecticut 0</td>
            <td class=""></td>

            <td class="spacer11" id="game"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1" id="game"></td>
            <td class=""></td>
            <td class="vtop">1. Purdue 0</td>
            <td class="bottom" id="game46">
              16. Grambling 50
            </td>
          </tr>

          <tr>
            <td class="top1" id="game2">
              8. FAU 65
            </td>
            <td class="bottom1" id="game9">
              9. Northwestern 0
            </td>
            <td class="topwinner"></td>

            <td class="spacer11" id="game"></td>

            <td class="regionspacer">&nbsp;</td>
            <td colspan="4" class="finalteam">
              {" "}
            </td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1" id="game"></td>
            <td class="topwinner"></td>
            <td class="bottom" id="game54">
              8. Utah St 0
            </td>
            <td class="top" id="game47">
              8. Utah St 88
            </td>
          </tr>

          <tr>
            <td class="vbottom" id="game2">
              9. Northwestern 77
            </td>

            <td class="spacer11 bottomwinner" id="game"></td>
            <td class="vtop"></td>

            <td class="spacer11" id="game"></td>

            <td class="regionspacer">&nbsp;</td>
            <td colspan="4" class="spacer112"></td>
            <td class="regionspacer">&nbsp;</td>

            <td class="spacer1" id="game"></td>
            <td class="vtop"></td>

            <td class="spacer1 bottomwinner" id="game"></td>
            <td class="vbottom" id="game47">
              9. TCU 72
            </td>
          </tr>

          <tr>
            <td class="vtop">5. San Diego St 69</td>

            <td class="spacer11 topwinner" id="game"></td>
            <td class="bottom1" id="game13"></td>

            <td class="spacer11" id="game"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td colspan="3" class="final4team top"></td>

            <td class="spacer1" id="game"></td>
            <td class="bottom" id="game58">
              5. Gonzaga 0
            </td>

            <td class="spacer1 topwinner" id="game"></td>
            <td class="vtop">5. Gonzaga 86</td>
          </tr>

          <tr>
            <td class="bottom1" id="game3">
              12. UAB 65
            </td>
            <td class="top1" id="game10">
              5. San Diego St 0
            </td>

            <td class="spacer11 bottomwinner" id="game"></td>

            <td class="spacer11" id="game"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td colspan="3" class="final4team"></td>

            <td class="spacer1" id="game"></td>

            <td class="spacer1 bottomwinner" id="game"></td>
            <td class="top" id="game55">
              5. Gonzaga 89
            </td>
            <td class="bottom" id="game48">
              12. McNeese St 65
            </td>
          </tr>

          <tr>
            <td class="top1" id="game4">
              4. Auburn 76
            </td>
            <td class="vbottom" id="game10">
              13. Yale 0
            </td>

            <td class="spacer11" id="game"></td>

            <td class="spacer11 topwinner" id="game"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td colspan="3"></td>

            <td class="spacer1 topwinner" id="game"></td>

            <td class="spacer1" id="game"></td>
            <td class="vbottom" id="game55">
              4. Kansas 68
            </td>
            <td class="top" id="game49">
              4. Kansas 93
            </td>
          </tr>

          <tr>
            <td class="vbottom" id="game4">
              13. Yale 78
            </td>
            <td class="bottomwinner"></td>
            <td rowspan="2" class="regionname1">
              <span style="padding:4px 16px;">East</span>
            </td>
            <td class="top1" id="game15"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="top" id="game60"></td>
            <td rowspan="2" class="regionname">
              <span style="padding:4px 16px;">Midwest</span>
            </td>
            <td class="bottomwinner"></td>
            <td class="vbottom" id="game49">
              13. Samford 89
            </td>
          </tr>

          <tr>
            <td class="vtop">3. Illinois 85</td>
            <td class="topwinner"></td>
            <td class="vbottom" id="game15"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="vbottom" id="game60"></td>
            <td class="topwinner"></td>
            <td class="vtop">3. Creighton 77</td>
          </tr>

          <tr>
            <td class="bottom1" id="game5">
              14. Morehead St 69
            </td>
            <td class="vtop">3. Illinois 0</td>

            <td class="spacer11" id="game"></td>
            <td class="bottomwinner"></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="bottomwinner"></td>

            <td class="spacer1" id="game"></td>
            <td class="vtop">3. Creighton 0</td>
            <td class="bottom" id="game50">
              14. Akron 60
            </td>
          </tr>

          <tr>
            <td class="top1" id="game6">
              6. BYU 67
            </td>
            <td class="bottom1" id="game11">
              11. Duquesne 0
            </td>

            <td class="spacer11 topwinner" id="game"></td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>

            <td class="spacer1 topwinner" id="game"></td>
            <td class="bottom" id="game56">
              11. Oregon 0
            </td>
            <td class="top" id="game51">
              6. S. Carolina 73
            </td>
          </tr>

          <tr>
            <td class="vbottom" id="game6">
              11. Duquesne 71
            </td>

            <td class="spacer11 bottomwinner" id="game"></td>
            <td class="top1" id="game14"></td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>
            <td class="top" id="game59"></td>

            <td class="spacer1 bottomwinner" id="game"></td>
            <td class="vbottom" id="game51">
              11. Oregon 87
            </td>
          </tr>

          <tr>
            <td class="vtop">7. Wash State 66</td>

            <td class="spacer11 topwinner" id="game"></td>
            <td class="vbottom" id="game14">
              2. Iowa St 0
            </td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>
            <td class="vbottom" id="game59"></td>

            <td class="spacer1 topwinner" id="game"></td>
            <td class="vtop">7. Texas 56</td>
          </tr>

          <tr>
            <td class="bottom1" id="game7">
              10. Drake 61
            </td>
            <td class="top1" id="game12">
              7. Wash State 56
            </td>
            <td class="bottomwinner"></td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>
            <td class="bottomwinner"></td>
            <td class="top" id="game57">
              7. Texas 0
            </td>
            <td class="bottom" id="game52">
              10. Colorado St 44
            </td>
          </tr>

          <tr>
            <td class="top1" id="game8">
              2. Iowa St 82
            </td>
            <td class="vbottom" id="game12">
              2. Iowa St 67
            </td>
            <td class=""></td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>
            <td class=""></td>
            <td class="vbottom" id="game57">
              2. Tennessee 0
            </td>
            <td class="top" id="game53">
              2. Tennessee 83
            </td>
          </tr>

          <tr>
            <td class="vbottom" id="game8">
              15. S Dakota St 65
            </td>
            <td class="bottomwinner"></td>
            <td class=""></td>
            <td class=""></td>

            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class="regionspacer">&nbsp;</td>
            <td class=""></td>
            <td class=""></td>
            <td class="bottomwinner"></td>
            <td class="vbottom" id="game53">
              15. St Peters 49
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
