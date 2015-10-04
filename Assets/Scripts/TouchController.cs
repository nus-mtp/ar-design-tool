using UnityEngine;
using System.Collections;
using Vuforia;

public class TouchController : MonoBehaviour {

	private GameObject panel;
	private GameObject pill;
	private GameObject click;
	private GameObject sample;

	// Use this for initialization
	void Start () {
		panel = GameObject.FindGameObjectWithTag("Panel");
		click = GameObject.FindGameObjectWithTag ("ClickMe");
        
		pill.SetActive (false);
        panel.SetActive(true);
    }
	
	void Update () {
        if (CustomTrackerBehaviour.isTracked)
        {
            panel.SetActive(false);
        }
        else
        {
            panel.SetActive(true);
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
