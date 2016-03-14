using UnityEngine;
using System.Collections;

public class Preview : MonoBehaviour {

    private bool isPreview = false;
    private StateManager stateManager;
    private int transitionStateId;
    private bool isStateChanger = false;

    void Start()
    {
        GameObject controlScripts = GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
        stateManager = controlScripts.GetComponent<StateManager>();
    }

    public void SetPreview(int transitionStateId, bool isStateChanger)
    {
        isPreview = true;
        this.transitionStateId = transitionStateId;
        this.isStateChanger = isStateChanger;
    }

    public void DisablePreview()
    {
        isPreview = false;
    }

    void OnMouseDown()
    {
        if (!isPreview)
        {
            return;
        }
        else
        {
            if (isStateChanger)
            {
                stateManager.SwitchState(transitionStateId);
            }
        }

    }
}
