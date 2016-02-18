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
    
    public Text currentSelectedDisplay;
    public Text stateNumberDisplay;

    public void InitialzeStates(List<SerialState> states)
    {
        foreach (State toDestroy in stateList)
        {
            toDestroy.Destroy();
        }
        stateList = new List<State>();  
        foreach (SerialState state in states)
        {
            State newState = new State();
            stateList.Add(newState);
            activeState = newState;
            foreach (SerialStateObject s in state.stateObjects)
            {
                foreach (GameObject g in objectCollection.GetUserObjects())
                {
                    if (g.name.Equals(s.modelName))
                    {
                        GameObject toSpawn = Instantiate(g);
                        StateObject stateObject = new StateObject(toSpawn);
                        s.InitializeStateObject(stateObject);
                        newState.AddToState(stateObject);
                        SetActiveGameObject(toSpawn);
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

    public void ForwardState()
    {
        int toSwitch = (stateNumber + 1) % stateList.Count;
        SwitchState(toSwitch);
    }

    public void ReverseState()
    {
        int toSwitch = (stateNumber - 1) % stateList.Count;
        SwitchState(toSwitch);
    }

    public void SwitchState(int toSwitch)
    {
        activeState.Hide();
        activeState = stateList[toSwitch];
        activeState.Show();
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT,toSwitch);
        stateNumber = toSwitch;
    }

    void Start()
    {
        objectCollection = gameObject.GetComponent<ObjectCollection>();
        stateList = new List<State>();
        State root = new State();
        stateList.Add(root);
        activeState = root;
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT,0);
    }

    public void AddNewState()
    {
        State newState = new State();
        stateList.Add(newState);
        SwitchState(stateList.Count - 1);
    }

    public void AddToState(GameObject g)
    {
        activeState.AddToState(g);
        SetActiveGameObject(g);
    }

    public void SetActiveGameObject(GameObject o)
    {
        string instanceName = activeState.SetActiveGameObject(o);
        if (instanceName != null)
        {
            currentSelectedDisplay.color = Color.black;
            currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT + instanceName;
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
