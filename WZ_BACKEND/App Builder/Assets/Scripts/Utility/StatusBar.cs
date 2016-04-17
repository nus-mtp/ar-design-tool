using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class StatusBar : MonoBehaviour{

    public Text stateName;
    private AppStateManager theOne;
    
    void Start(){
        theOne = AppStateManager.GetReference();
    }

    void Update()
    {
        stateName.text = theOne.GetCurrentStateName();
    }
}
