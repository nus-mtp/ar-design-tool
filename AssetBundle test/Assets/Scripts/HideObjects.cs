using UnityEngine;
using System.Collections;

public class HideObjects : MonoBehaviour {
    private GameObject[] hidableObjects;
    private bool hidden = false;
	// Use this for initialization
	void Start () {
       hidableObjects = GameObject.FindGameObjectsWithTag("hide");
	}

    
    public void hideObjects()
    {
        
        if (hidden)
        {
            foreach (GameObject h in hidableObjects)
            {
                h.SetActive(true);
            }
        }
        else
        {
            foreach (GameObject h in hidableObjects)
            {
                h.SetActive(false);
            }
        }
        hidden = !hidden;
    }
}
