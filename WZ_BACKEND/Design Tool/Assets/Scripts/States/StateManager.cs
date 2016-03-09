using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class StateManager : MonoBehaviour {

    private const string CURRENT_SELECTED_ITEM_TEXT = "Current Selected Item: ";
    private const string CURRENT_STATE_TEXT = "Current State:{0}";

    private ObjectCollection objectCollection;
    private List<State> stateList;
    private State activeState;
    private int stateNumber;
    private int nextStateId;
    
    public Text currentSelectedDisplay;
    public Text stateNumberDisplay;

    public void InitialzeStates(List<SerialState> serialStates)
    {
        foreach (State toDestroy in stateList)
        {
            toDestroy.DestroyState();
        }
        stateList = new List<State>();  
        foreach (SerialState serialState in serialStates)
        {
            State newState = new State(serialState);
            stateList.Add(newState);
            activeState = newState;
            foreach (SerialStateObject s in serialState.stateObjects)
            {
                foreach (GameObject g in objectCollection.GetUserObjects())
                {
                    if (g.name.Equals(s.modelName))
                    {
                        GameObject toSpawn = Instantiate(g);
                        StateObject stateObject = new StateObject(toSpawn);
                        s.InitializeStateObject(stateObject);
                        newState.AddToState(stateObject);
                        break;
                    }
                }
            }
            newState.Hide();
        }
        activeState = stateList[0];
        activeState.Show();
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT,0);
    }

    public List<string> GetStateNames()
    {
        List<string> names = new List<string>();
        foreach (State s in stateList)
        {
            names.Add(s.id.ToString());
        }
        return names;
    }

    public void ForwardState()
    {
        int toSwitch = (stateNumber + 1) % stateList.Count;
        SwitchState(toSwitch);
    }

    public void ReverseState()
    {
        int toSwitch = (stateList.Count + stateNumber - 1) % stateList.Count;
        SwitchState(toSwitch);
    }

    public void SwitchState(int toSwitch)
    {
        if (activeState != null)
        {
            activeState.Hide();
        }
        activeState = stateList[toSwitch];
        activeState.Show();
        SetActiveGameObject(GetActiveGameObject());
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT,toSwitch);
        stateNumber = toSwitch;
    }

    void Start()
    {
        objectCollection = gameObject.GetComponent<ObjectCollection>();
        stateList = new List<State>();
        AddNewState();
        activeState = stateList[0];
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT,0);
    }

    public void AddNewState()
    {
        State newState = new State(nextStateId);
        nextStateId++;
        stateList.Add(newState);
        int count = stateList.Count;
        newState.SetName(count);
        SwitchState(stateList.Count - 1);
    }

    public void AddToState(GameObject g)
    {
        activeState.AddToState(g);
        SetActiveGameObject(g);
    }

    public void SetActiveGameObject(GameObject o)
    {
        if (o == null)
        {
            currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT;
        }
        else
        {
            string instanceName = activeState.SetActiveGameObject(o);
            if (instanceName != null)
            {
                currentSelectedDisplay.color = Color.black;
                currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT + instanceName;
            }
        }
    }

    public GameObject GetActiveGameObject()
    {
        return activeState.activeGameObject;
    }

    public void RemoveActiveObject()
    {
        activeState.RemoveActiveObject();
        currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT;
    }

    public void DeleteState(int i)
    {
        stateList.RemoveAt(i);
    }
    
    public List<SerialState> ToSerial()
    {
        List<SerialState> serialStates = new List<SerialState>();
        stateNumber = 0;
        foreach (State s in stateList)
        {
            SerialState serialState = new SerialState(s);
            serialStates.Add(serialState);
        }
        return serialStates;
    }
}
