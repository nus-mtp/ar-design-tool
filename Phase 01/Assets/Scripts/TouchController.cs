using UnityEngine;
using UnityEngine.EventSystems;
using System.Collections;
using Vuforia;

public class TouchController : MonoBehaviour {
    
    private GameObject panel;
    private ModalPanel mp;

	public static bool objectIsFound = false;

	// Use this for initialization
	void Start () {
		panel = GameObject.FindGameObjectWithTag("Panel");
        panel.SetActive(true);
        if (!mp)
            mp = ModalPanel.Instance();
        mp.Close();
    }
	
	void Update () {
        if (CustomTrackerBehaviour.isTracked)
        {
            panel.SetActive(false);
			objectIsFound = true;
        }
        else
        {
            panel.SetActive(true);
			objectIsFound = false;
        }

        if (Input.GetMouseButtonDown(0)){ 
			Ray ray =Camera.main.ScreenPointToRay(Input.mousePosition);
			RaycastHit hit;
            int touchId = Input.touchCount == 0 ? -1 : Input.GetTouch(0).fingerId;
            if (Physics.Raycast(ray, out hit)){
                if (hit.collider && !EventSystem.current.IsPointerOverGameObject(touchId))
                {
                    GameObject obj = hit.collider.gameObject;
                    AbstractTouchListener objListener = obj.GetComponent<AbstractTouchListener>();
                    Debug.Log(objListener);
                    if(objListener != null)
                    {
                        objListener.touchHandler(); 
                    }
                }
			}
		}
	}	
}
