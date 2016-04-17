using UnityEngine;
using System.Collections;

public class BackButton : MonoBehaviour {

    AppStateManager theOne;
	// Use this for initialization
	void Start () {
        theOne = AppStateManager.GetReference();
	}

    public void Back()
    {
        if (theOne.isMarkerFound)
        {
            theOne.GoBack();
        }
    }
}
