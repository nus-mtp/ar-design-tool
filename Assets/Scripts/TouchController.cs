using UnityEngine;
using System.Collections;
using Vuforia;

public class TouchController : MonoBehaviour {

	private GameObject panel;
	private GameObject pill;
	private GameObject click;
	private GameObject sample;
	public static bool hasbeenClicked = false;

	// Use this for initialization
	void Start () {
		panel = GameObject.FindGameObjectWithTag("Panel");
		pill = GameObject.FindGameObjectWithTag ("Pill");
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
				if(hit.collider.tag == "BottleCap")
				{
					GameObject obj=GameObject.FindGameObjectWithTag("BottleCap");
					//Debug.Log ("Yeah i can click on it" + obj.name);
					pill.SetActive(true);
					click.SetActive(false);
				}
				if(hit.collider.tag == "Pill")
				{
					GameObject obj=GameObject.FindGameObjectWithTag("Pill");
					sample.SetActive (true);
					hasbeenClicked = true;
				}
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
