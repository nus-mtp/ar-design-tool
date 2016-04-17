using UnityEngine;
using System.Collections;

public class Preview : MonoBehaviour {

    private bool isPreview = false;
    private StateManager stateManager;
    private int transitionStateId;
    public void DisablePreview()
    {
        isPreview = false;
    }

    public void SetPreview(int transitionStateId)
    {
        isPreview = true;
        this.transitionStateId = transitionStateId;
        
    }

    void OnMouseDown()
    {
        if (!isPreview)
        {
            return;
        }
        else
        {
            if (transitionStateId != -1)
            {
                stateManager.SwitchState(transitionStateId);
            }
        }

    }

    void Start()
    {
        GameObject controlScripts = GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
        stateManager = controlScripts.GetComponent<StateManager>();
    }
}
