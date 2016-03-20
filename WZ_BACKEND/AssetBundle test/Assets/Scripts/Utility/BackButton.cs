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
        theOne.GoBack();
    }
}
