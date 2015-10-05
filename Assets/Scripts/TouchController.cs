using UnityEngine;
using System.Collections;
using Vuforia;

public class TouchController : MonoBehaviour {

	private GameObject panel;
	public static bool objectIsFound = false;

	// Use this for initialization
	void Start () {
		panel = GameObject.FindGameObjectWithTag("Panel");
        panel.SetActive(true);
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
			if (Physics.Raycast(ray, out hit)){
                if(hit.collider)
                {
                    GameObject obj = hit.collider.gameObject;
                    AbstractTouchListener objListener = obj.GetComponent<AbstractTouchListener>();
                    if(objListener != null)
                    {
                        objListener.touchHandler(); 
                    }
                }
			}
		}
	}	
}
