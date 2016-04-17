using UnityEngine;
using UnityEngine.EventSystems;
using System.Collections;

public class StateObject : MonoBehaviour {
    public int id;
    public int transitionStateId;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnMouseDown()
    {
        if (transitionStateId != -1 && !( EventSystem.current.IsPointerOverGameObject() || EventSystem.current.currentSelectedGameObject != null))
        {
            AppStateManager.GetReference().changeStateNormal(transitionStateId);
        }
    }

#if UNITY_EDITOR
    public void SetUp(SerialStateObject sso)
    {
        gameObject.name = sso.instanceName;
        transform.position = sso.position.ToVector3();
        transform.rotation = sso.rotation.ToQuaternion();
        transform.localScale = sso.scale.ToVector3();
        transitionStateId = sso.transitionStateId;
        id = sso.id;
    }
#endif
}
