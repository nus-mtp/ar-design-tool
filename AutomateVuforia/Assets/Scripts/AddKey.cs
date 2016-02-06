using UnityEngine;
using System.Collections;

public class AddKey : MonoBehaviour
{

    void Awake()
    {

        Vuforia.VuforiaBehaviour vscript = gameObject.GetComponent<Vuforia.VuforiaBehaviour>();
        vscript.SetAppLicenseKey(
             "AdUxSeL/////AAAAAeB842M27k70iUaf5FZHK4ZTRnhdGmRDabLfEEhIqECLBGr8FinoZ+Jxit1Tc9+PrUo/ebkS70phSOt"
         + "7hS0G2er1tS5wVJzZC2Q3BMcUo7AtIJ4Nr9qRmp8iQ5A4qYwrgh62pALM4DmZZ/tmeiSrfpwuJEgYScRNLfRDyW1lc2ypk+cle1uPkOeyhuWqwrb"
         + "PMX9iZogkDTdtEXim+GIjWT0w73AfIRo9tLlcVG1/mKN9fdqrKsbfKWWJIHuPn0ROZ00GXdAOfErnV8KQDRrlpbzrOwivQ05r73ImTzjy/1PQf98h"
         + "i9gfwyYoJY2J+0Ug7JDB9adnCwg+G7/FaLnTwiUej8l33+U4C9FW0Q/dmyBS");
        
 
    }

}
