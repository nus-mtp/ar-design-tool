using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class AppStateManager : MonoBehaviour
{

    public List<GameObject> states;
    public List<State> stateComponents;
    public int currentStateId;
    public bool isMarkerFound = false;

    public static AppStateManager theOne;
    // Use this for initialization
    void Awake()
    {
        currentStateId = stateComponents[0].id;
        Debug.Log(currentStateId);
        if (theOne == null)
        {
            theOne = this;
        }
        else
        {
            DestroyImmediate(this);
        }
        changeState(currentStateId);
    }

    public static AppStateManager GetReference()
    {
        return theOne;
    }

    public void changeState(int toChange)
    {
        foreach (State s in stateComponents)
        {
            if (s.id != toChange)
            {
                s.gameObject.SetActive(false);
            }
            else
            {
                s.gameObject.SetActive(true);
            }
        }
    }

    public void hideOthers()
    {
        foreach (State s in stateComponents)
        {
            if (s.id != currentStateId)
            {
                s.gameObject.SetActive(false);
            }
        }
    }
#if UNITY_EDITOR
    public void SetUp(List<SerialState> serialStates, GameObject marker)
    {
        states = new List<GameObject>();
        stateComponents = new List<State>();
        foreach (SerialState s in serialStates)
        {
            GameObject currentStateGO = new GameObject();
            currentStateGO.name = s.name;
            State currentState = currentStateGO.AddComponent<State>();
            currentState.SetUp(s);
            states.Add(currentStateGO);
            stateComponents.Add(currentState);
            currentStateGO.transform.SetParent(marker.transform);

        }
    }
#endif


}
