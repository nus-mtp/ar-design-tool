using UnityEngine;
using System.Collections;

public class StateObject{
    
    public GameObject gameObject;
    public string instanceName;

    public StateObject(GameObject g)
    {
        gameObject = g;
        instanceName = g.name;
    }

    public void Hide()
    {
        gameObject.SetActive(false);
    }

    public void Show()
    {
        gameObject.SetActive(true);
    }

}
