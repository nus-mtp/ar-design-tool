using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class StateManager : MonoBehaviour {

    private const string CURRENT_SELECTED_ITEM_TEXT = "Current Selected Item: ";
    private const string CURRENT_STATE_TEXT = "Current State:{0}";
    private const string PREVIEW_MODE_TEXT = "In Preview Mode";
    private const string EDIT_MODE_TEXT = "In Edit Mode";
    public const string CONTROL_SCRIPT_TAG = "ControlScripts";

    private ObjectCollection objectCollection;
    private List<State> stateList;
    private State activeState;
    private int stateNumber;
    private int nextStateId;
    private bool isPreview = false;
    private float initialAspectRatio;
    
    public Text currentSelectedDisplay;
    public Text stateNumberDisplay;
    public GameObject leftBlockOut;
    public GameObject rightBlockOut;

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
    
    public ProjectState ToSerial()
    {
        ProjectState project = new ProjectState();
        List<SerialState> serialStates = new List<SerialState>();
       
        foreach (State s in stateList)
        {
            SerialState serialState = new SerialState(s);
            serialStates.Add(serialState);
        }
        project.serialStates = serialStates;
        return project;
    }

    public void TogglePreview()
    {
        isPreview = !isPreview;
        if (isPreview)
        {
            EnterPreview();
        }
        else
        {
            ExitPreview();
        }
    }

    private void EnterPreview()
    {
        GameObject active = GetActiveGameObject();
        leftBlockOut.SetActive(true);
        rightBlockOut.SetActive(true);
        RectTransform left = leftBlockOut.GetComponent<RectTransform>();
        RectTransform right = rightBlockOut.GetComponent<RectTransform>();
        currentSelectedDisplay.text = PREVIEW_MODE_TEXT;
        float widthOfBLockOut = (Screen.width / 2) - (Screen.height * 9 / 32);
        left.sizeDelta = new Vector2(widthOfBLockOut, Screen.height);
        right.sizeDelta = new Vector2(widthOfBLockOut, Screen.height);
        if (active != null)
        {
            active.GetComponent<Transformable>().destroyElements();
        }
        foreach (State s in stateList)
        {
            s.SetPreview();
        }
    }

    private void ExitPreview()
    {
        GameObject active = GetActiveGameObject();
        leftBlockOut.SetActive(false);
        rightBlockOut.SetActive(false);
        currentSelectedDisplay.text = EDIT_MODE_TEXT;
        if (active != null)
        {
            active.GetComponent<Transformable>().initializeElements();
        }
        foreach (State s in stateList)
        {
            s.DisablePreview();
        }
    }
}
