using UnityEngine;
using System.Collections;

public class StateObject{
    
    public GameObject gameObject;
    public GameObject button;
    public StateObjectChanger stateObjectChanger;
    public string instanceName;
    public int id;
    public bool isClickable;
    public int transitionStateId;
    public StateObjectType type;

    public StateObject(GameObject g, StateObjectType type)
    {
        gameObject = g;
        instanceName = g.name;
        g.AddComponent<Transformable>();
        g.AddComponent<Preview>();
        this.type = type;
    }

    public void Hide()
    {
        gameObject.SetActive(false);
        button.SetActive(false);
    }

    public void Show()
    {
        gameObject.SetActive(true);
        button.SetActive(true);
    }

    public void Destroy()
    {
        gameObject.GetComponent<Transformable>().destroyElements();
        MonoBehaviour.Destroy(button);
        MonoBehaviour.Destroy(gameObject);
    }

    public void SetPreview()
    {
        Transformable t = gameObject.GetComponent<Transformable>();
        t.SetPreview();
        Preview p = gameObject.GetComponent<Preview>();
        p.SetPreview(transitionStateId, isClickable);
    }

    public void DisablePreview()
    {
        Transformable t = gameObject.GetComponent<Transformable>();
        t.DisablePreview();
        Preview p = gameObject.GetComponent<Preview>();
        p.DisablePreview();
    }


    public void SetName(string newName)
    {
        instanceName = newName;
    }

    public void RemoveLink(int stateId)
    {
        if (isClickable && transitionStateId == stateId)
        {
            UnSetTransition();
        }
    }

    public void UnSetTransition()
    {
        isClickable = false;
        stateObjectChanger.UnSetIsStateChanger();
    }

    public void SetTransition(int transitionStateId)
    {
        isClickable = true;
        this.transitionStateId = transitionStateId;
    }
}


